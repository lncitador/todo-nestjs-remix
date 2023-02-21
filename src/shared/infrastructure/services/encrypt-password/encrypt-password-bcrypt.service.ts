import { Injectable } from '@nestjs/common';
import { IEncryptPassword } from '~/shared/domain/interfaces/encrypt-password.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptPasswordBcryptService implements IEncryptPassword {
  public encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
