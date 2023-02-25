import { BaseRepository } from '~/shared/domain/base/repository';
import { TaskEntity } from '../entities/task.entity';

export abstract class ITasksRepository extends BaseRepository<TaskEntity> {}
