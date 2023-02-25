import { BaseRepository } from '~/shared/domain/base/repository';
import { Either } from '~/shared/domain/logic';
import { DirectoryEntity } from '../entities/directory.entity';

export abstract class IDirectoriesRepository extends BaseRepository<DirectoryEntity> {
  public abstract findByUserId(
    userId: string,
  ): Promise<Either<Error, DirectoryEntity[]>>;
}
