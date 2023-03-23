import * as path from 'path';
import { DynamicModule, Global, Provider } from '@nestjs/common';
import { SessionConfig } from './modules/authenticator/domain/providers/session.provider';
import { InfrastructureModule } from './shared/infrastructure/container.module';
import { AuthenticatorModule } from './modules/authenticator/authenticator.module';
import { UsersModule } from './modules/users/users.module';
import { RemixModule } from 'nest-remix';

@Global()
@RemixModule({
  imports: [InfrastructureModule, UsersModule, AuthenticatorModule],
  publicDir: path.join(process.cwd(), 'public'),
  browserBuildDir: path.join(process.cwd(), 'build/'),
  exports: [AuthenticatorModule, UsersModule],
  controllers: [],
})
export class ApplicationModule {
  public static register({
    session,
  }: {
    session: SessionConfig;
  }): DynamicModule {
    const sessionConfig: Provider = {
      provide: SessionConfig,
      useValue: session,
    };

    return {
      module: ApplicationModule,
      providers: [sessionConfig],
      exports: [sessionConfig],
    };
  }
}
