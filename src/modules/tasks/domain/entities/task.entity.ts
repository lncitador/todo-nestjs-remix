import { TodosModel } from '~/libs/zod';
import {
  DirectoryEntity,
  DirectoryEntityProps,
} from '~/modules/directories/domain/entities/directory.entity';
import { BaseEntity } from '~/shared/domain/base/entity';
import { Either, left, Maybe, right } from '~/shared/domain/logic';
import { CreateTaskError } from '../errors/create-task.error';

export interface TaskEntityProps {
  id?: string;
  title: string;
  description: Maybe<string>;
  completed: boolean;
  important: boolean;
  dueDate: Date;
  userId: string;
  directoryId: string;
  Directory?: DirectoryEntityProps;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TaskEntity extends BaseEntity implements TaskEntityProps {
  public id: string;
  public title: string;
  public description: Maybe<string>;
  public completed: boolean;
  public important: boolean;
  public dueDate: Date;
  public userId: string;
  public directoryId: string;
  public Directory?: DirectoryEntity;
  public createdAt: Date;
  public updatedAt: Date;

  private constructor(props: TaskEntityProps) {
    super();

    this.id = props.id || this.generateId();
    this.title = props.title;
    this.description = props.description;
    this.completed = props.completed;
    this.important = props.important;
    this.dueDate = props.dueDate;
    this.userId = props.userId;
    this.directoryId = props.directoryId;
    this.Directory = props.Directory && DirectoryEntity.from(props.Directory);
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  public static create(props: TaskEntityProps): Either<Error, TaskEntity> {
    this.validateProps(props);

    return right(new TaskEntity(props));
  }

  private static validateProps(props: TaskEntityProps) {
    const validate = TodosModel.partial({
      id: true,
      createdAt: true,
      updatedAt: true,
    }).safeParse(props);

    console.log(validate);

    if (validate.success === false) {
      throw left(
        new CreateTaskError(
          validate.error.message,
          validate.error.flatten().fieldErrors,
        ),
      );
    }
  }

  public static from(props: TaskEntityProps): TaskEntity;
  public static from(props: TaskEntityProps[]): TaskEntity[];
  public static from(props: TaskEntityProps | TaskEntityProps[]) {
    if (Array.isArray(props)) {
      return props.map((prop) => new TaskEntity(prop));
    }

    return new TaskEntity(props);
  }
}
