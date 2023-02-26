import { Prisma } from '~/libs/prisma';
import { TaskEntity } from '~/modules/tasks/domain/entities/task.entity';
import { CreateTaskError } from '~/modules/tasks/domain/errors/create-task.error';
import { TaskNotFoundError } from '~/modules/tasks/domain/errors/task-not-found.error';
import {
  FindTasksByUserId,
  ITasksRepository,
} from '~/modules/tasks/domain/repositories/tasks.repository';
import { CreateData, UpdateData } from '~/shared/domain/base/repository';
import { Either, left, right } from '~/shared/domain/logic';
import { PrismaRepository } from '~/shared/infrastructure/database/prisma/repositories/prisma.repository';

export class TasksPrismaRepository
  extends PrismaRepository
  implements ITasksRepository
{
  public async findByUserId({
    userId,
    directoryId,
    sort,
    q,
  }: FindTasksByUserId): Promise<Either<Error, TaskEntity[]>> {
    try {
      const tasks = await this.prisma.todos
        .findMany({
          where: { userId, directoryId, title: { contains: q } },
          orderBy: {
            ...(sort === 'order-added' && { createdAt: 'desc' }),
            ...(sort === 'uncompleted-first' && { completed: 'asc' }),
            ...(sort === 'completed-first' && { completed: 'desc' }),
            ...(sort === 'max-date' && { dueDate: 'desc' }),
            ...(sort === 'min-date' && { dueDate: 'asc' }),
          },
          include: {
            Directory: true,
          },
        })
        .then((tasks) => TaskEntity.from(tasks));

      return right(tasks);
    } catch {
      return left(new TaskNotFoundError(userId));
    }
  }

  public async create<
    L = Prisma.PrismaClientKnownRequestError | CreateTaskError,
    A = TaskEntity,
  >(data: CreateData<TaskEntity>): Promise<Either<L, A>> {
    try {
      const validate = TaskEntity.create(data);

      if (validate.isLeft()) {
        return left(validate.value as L);
      }

      await this.prisma.todos.create({
        data: {
          title: validate.value.title,
          description: validate.value.description,
          completed: validate.value.completed,
          dueDate: validate.value.dueDate,
          userId: validate.value.userId,
          directoryId: validate.value.directoryId,
        },
      });

      return right(validate.value as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async update<
    L = Prisma.PrismaClientKnownRequestError | TaskNotFoundError,
    A = TaskEntity,
  >(id: string, data: UpdateData<TaskEntity>): Promise<Either<L, A>> {
    try {
      const task = await this.findById(id);

      if (task.isLeft()) return task as Either<L, A>;

      task.value.fill(data);

      await this.prisma.todos.update({
        where: { id },
        data: {
          title: task.value.title,
          description: task.value.description,
          completed: task.value.completed,
          dueDate: task.value.dueDate,
        },
      });

      return right(task.value as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async findById<
    L = Prisma.PrismaClientKnownRequestError | TaskNotFoundError,
    A = TaskEntity,
  >(id: string): Promise<Either<L, A>> {
    try {
      const taskExist = await this.prisma.todos.findUnique({ where: { id } });

      if (!taskExist) {
        return left(new TaskNotFoundError(id) as L);
      }

      const task = TaskEntity.create(taskExist);

      if (task.isLeft()) {
        return left(task.value as L);
      }

      return right(task.value as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async findMany<L, A = TaskEntity[]>(): Promise<Either<L, A>> {
    try {
      const tasks = await this.prisma.todos
        .findMany()
        .then((tasks) => TaskEntity.from(tasks));

      return right(tasks as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async delete<L, A = void>(id: string): Promise<Either<L, A>> {
    try {
      const task = await this.findById(id);

      if (task.isLeft()) return task as Either<L, A>;

      await this.prisma.todos.delete({ where: { id } });

      return right({
        message: `Task with id ${id} deleted`,
      } as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async count?(): Promise<number> {
    return this.prisma.todos.count();
  }
}
