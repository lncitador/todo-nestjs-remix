import { Global, Module, Provider } from '@nestjs/common';
import { IEncryptPassword } from '~/shared/domain/interfaces/encrypt-password.interface';
import { EncryptPasswordBcryptService } from './encrypt-password-bcrypt.service';

const provider: Provider = {
  provide: IEncryptPassword,
  useClass: EncryptPasswordBcryptService,
};

@Global()
@Module({
  providers: [provider],
  exports: [provider],
})
export class EncryptPasswordModule {}
