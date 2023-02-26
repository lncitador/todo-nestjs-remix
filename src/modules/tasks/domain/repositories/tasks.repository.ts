import { SortValue } from '~/app/utils/sort-list';
import { BaseRepository } from '~/shared/domain/base/repository';
import { Either } from '~/shared/domain/logic';
import { TaskEntity } from '../entities/task.entity';

export interface FindTasksByUserId {
  userId: string;
  directoryId?: string;
  sort?: SortValue;
  q?: string;
}

export abstract class ITasksRepository extends BaseRepository<TaskEntity> {
  public abstract findByUserId(
    inputs: FindTasksByUserId,
  ): Promise<Either<Error, TaskEntity[]>>;
}
