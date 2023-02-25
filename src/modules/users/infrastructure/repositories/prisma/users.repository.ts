import { Prisma } from '~/libs/prisma';
import { UserEntity } from '~/modules/users/domain/entities/user.entity';
import { CreateUserError } from '~/modules/users/domain/errors/create-user.error';
import { UserByEmailError } from '~/modules/users/domain/errors/user-by-email.error';
import { UserNotFound } from '~/modules/users/domain/errors/user-not-found.error';
import { IUsersRepository } from '~/modules/users/domain/repositories/users.repository';
import { CreateData, UpdateData } from '~/shared/domain/base/repository';
import { Either, left, right } from '~/shared/domain/logic';
import { PrismaRepository } from '~/shared/infrastructure/database/prisma/repositories/prisma.repository';

export class UsersPrismaRepository
  extends PrismaRepository
  implements IUsersRepository
{
  public async findByEmail(
    email: string,
  ): Promise<Either<UserByEmailError, UserEntity>> {
    const userExist = await this.prisma.user.findUnique({ where: { email } });

    if (!userExist) {
      return left(new UserByEmailError(email));
    }

    const user = UserEntity.create(userExist);

    if (user.isLeft()) {
      return left(new UserByEmailError(email));
    }

    return right(user.value);
  }

  public async create<
    L = Prisma.PrismaClientKnownRequestError | CreateUserError,
    A = UserEntity,
  >(data: CreateData<UserEntity>): Promise<Either<L, A>> {
    try {
      const user = UserEntity.create(data);

      if (user.isLeft()) {
        return left(user.value as L);
      }

      await this.prisma.user.create({
        data: user.value,
      });

      return right(user.value as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async update<
    L = Prisma.PrismaClientKnownRequestError | UserNotFound,
    A = UserEntity,
  >(id: string, data: UpdateData<UserEntity>): Promise<Either<L, A>> {
    try {
      const user = await this.getById(id);

      if (user.isLeft()) return user as Either<L, A>;

      user.value.fill(data);

      await this.prisma.user.update({
        where: { id },
        data: user.value,
      });

      return right(user.value as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async getById<
    L = Prisma.PrismaClientKnownRequestError | UserNotFound,
    A = UserEntity,
  >(id: string): Promise<Either<L, A>> {
    try {
      const userExist = await this.prisma.user.findUnique({ where: { id } });

      if (!userExist) {
        return left(new UserNotFound(id) as L);
      }

      const user = UserEntity.create(userExist);

      if (user.isLeft()) {
        return left(user.value as L);
      }

      return right(user.value as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async getAll<L, A = UserEntity[]>(): Promise<Either<L, A>> {
    try {
      const users = await this.prisma.user.findMany();

      return right(users as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async delete<L, A = void>(id: string): Promise<Either<L, A>> {
    try {
      const user = await this.getById(id);

      if (user.isLeft()) return user as Either<L, A>;

      await this.prisma.user.delete({ where: { id } });

      return right({
        message: 'User deleted successfully',
      } as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async count?(): Promise<number> {
    return this.prisma.user.count();
  }
}
