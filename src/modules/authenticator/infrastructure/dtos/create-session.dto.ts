import { IsString, IsNotEmpty } from 'class-validator';
import { SessionPayload } from '../../domain/interfaces/session-payload.interface';

export class CreateSessionDto implements SessionPayload {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
