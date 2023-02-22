import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { SessionConfig } from './modules/authenticator/domain/providers/session.provider';
import { InfrastructureModule } from './shared/infrastructure/container.module';
import { AuthenticatorModule } from './modules/authenticator/authenticator.module';

@Global()
@Module({
  imports: [InfrastructureModule, AuthenticatorModule],
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
