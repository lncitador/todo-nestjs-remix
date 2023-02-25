import { Prisma } from '@prisma/client';
import { DirectoryEntity } from '~/modules/directories/domain/entities/directory.entity';
import { CreateDirectoryError } from '~/modules/directories/domain/errors/create-directory.error';
import { DirectoryNotFoundError } from '~/modules/directories/domain/errors/directory-not-found.error';
import { IDirectoriesRepository } from '~/modules/directories/domain/repositories/directories.repository';
import { CreateData, UpdateData } from '~/shared/domain/base/repository';
import { Either, left, right } from '~/shared/domain/logic';
import { PrismaRepository } from '~/shared/infrastructure/database/prisma/repositories/prisma.repository';

export class DirectoriesPrismaRepository
  extends PrismaRepository
  implements IDirectoriesRepository
{
  public async findByUserId(
    userId: string,
  ): Promise<Either<Error, DirectoryEntity[]>> {
    try {
      const directories = await this.prisma.directory
        .findMany({
          where: { userId },
        })
        .then((directories) => DirectoryEntity.from(directories));

      return right(directories);
    } catch {
      return left(new DirectoryNotFoundError(userId));
    }
  }

  public async create<
    L = Prisma.PrismaClientKnownRequestError | CreateDirectoryError,
    A = DirectoryEntity,
  >(data: CreateData<DirectoryEntity>): Promise<Either<L, A>> {
    try {
      const directory = DirectoryEntity.create(data);

      if (directory.isLeft()) {
        return left(directory.value as L);
      }

      await this.prisma.directory.create({
        data: directory.value,
      });

      return right(directory.value as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async update<
    L = Prisma.PrismaClientKnownRequestError | DirectoryNotFoundError,
    A = DirectoryEntity,
  >(id: string, data: UpdateData<DirectoryEntity>): Promise<Either<L, A>> {
    try {
      const directory = await this.findById(id);

      if (directory.isLeft()) return directory as Either<L, A>;

      directory.value.fill(data);

      await this.prisma.directory.update({
        where: { id },
        data: directory.value,
      });

      return right(directory.value as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async findById<
    L = Prisma.PrismaClientKnownRequestError | DirectoryNotFoundError,
    A = DirectoryEntity,
  >(id: string): Promise<Either<L, A>> {
    try {
      const directoryExist = await this.prisma.directory.findUnique({
        where: { id },
      });

      if (!directoryExist) {
        return left(new DirectoryNotFoundError(id) as L);
      }

      const directory = DirectoryEntity.create(directoryExist);

      if (directory.isLeft()) {
        return left(directory.value as L);
      }

      return right(directory.value as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async findMany<L, A = DirectoryEntity[]>(): Promise<Either<L, A>> {
    try {
      const directories = await this.prisma.directory
        .findMany()
        .then((data) => DirectoryEntity.from(data));

      return right(directories as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async delete<L, A = void>(id: string): Promise<Either<L, A>> {
    try {
      await this.prisma.directory.delete({ where: { id } });

      return right({
        message: 'Directory deleted successfully',
      } as A);
    } catch (error) {
      return left(error as L);
    }
  }

  public async count?(): Promise<number> {
    return this.prisma.directory.count();
  }
}
