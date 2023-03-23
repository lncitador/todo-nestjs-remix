import { Prisma } from '~/libs/prisma';
import { UserEntity } from '~/modules/users/domain/entities/user.entity';
import { CreateUserError } from '~/modules/users/domain/errors/create-user.error';
import { UserByEmailError } from '~/modules/users/domain/errors/user-by-email.error';
import { UserNotFound } from '~/modules/users/domain/errors/user-not-found.error';
import { IUsersRepository } from '~/modules/users/domain/repositories/users.repository';
import { BaseEntity } from '~/shared/domain/base/entity';
import {
  CreateData,
  RepositoryError,
  RepositoryReturn,
  UpdateData,
} from '~/shared/domain/base/repository';
import { PrismaRepository } from '~/shared/infrastructure/database/prisma/repositories/prisma.repository';

export class UsersPrismaRepository
  extends PrismaRepository
  implements IUsersRepository
{
  public async findByEmail(
    email: string,
  ): Promise<RepositoryReturn<UserByEmailError, UserEntity>> {
    try {
      const attempt = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!attempt) {
        return [new UserByEmailError(email), null];
      }

      const user = UserEntity.from(attempt);

      return [null, user];
    } catch (error) {
      return [error as any, null];
    }
  }

  public async create(
    data: CreateData<UserEntity>,
  ): Promise<RepositoryReturn<RepositoryError, UserEntity>> {
    try {
      const attempt = await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: data.password,
          rolesId: data.rolesId,
        },
      });

      const user = UserEntity.from(attempt);

      return [null, user];
    } catch (error) {
      return [error as any, null];
    }
  }

  public async update(
    id: string,
    data: UpdateData<UserEntity>,
  ): Promise<RepositoryReturn<RepositoryError, UserEntity>> {
    try {
      const attempt = await this.prisma.user.update({
        where: { id },
        data: {
          email: data.email,
          name: data.name,
          password: data.password,
          rolesId: data.rolesId,
        },
      });

      const user = UserEntity.from(attempt);

      return [null, user];
    } catch (error) {
      return [error as any, null];
    }
  }

  public async findById(
    id: string,
  ): Promise<RepositoryReturn<RepositoryError, UserEntity>> {
    try {
      const attempt = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!attempt) {
        return [new UserNotFound(id), null];
      }

      const user = UserEntity.from(attempt);

      return [null, user];
    } catch (error) {
      return [error as any, null];
    }
  }

  public async findMany(): Promise<
    RepositoryReturn<RepositoryError, UserEntity[]>
  > {
    try {
      const attempt = await this.prisma.user.findMany();
      const users = UserEntity.from(attempt);

      return [null, users];
    } catch (error) {
      return [error as any, null];
    }
  }

  public async delete(
    id: string,
  ): Promise<RepositoryReturn<RepositoryError, void>> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return [null, {} as any];
    } catch (error) {
      return [error as any, null];
    }
  }

  public async count?(): Promise<RepositoryReturn<RepositoryError, number>> {
    try {
      const attempt = await this.prisma.user.count();

      return [null, attempt];
    } catch (error) {
      return [error as any, null];
    }
  }
}
