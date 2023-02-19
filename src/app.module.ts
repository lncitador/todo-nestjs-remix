import * as path from 'path';
import { RemixModule } from 'nest-remix';
import { HelloWorldBackend } from './app/routes/hello-world.server';
import { DynamicModule, Global } from '@nestjs/common';
import { SessionProvider } from './modules/authenticator/domain/providers/session';
import { InfrastructureModule } from './shared/infrastructure/container.module';
import { AuthenticatorModule } from './modules/authenticator/authenticator.module';

@Global()
@RemixModule({
  publicDir: path.join(process.cwd(), 'public'),
  browserBuildDir: path.join(process.cwd(), 'build/'),
  imports: [InfrastructureModule, AuthenticatorModule],
  controllers: [],
  providers: [HelloWorldBackend],
  // exports: [InfrastructureModule],
})
export class ApplicationModule {
  public static register({
    session,
  }: {
    session: SessionProvider;
  }): DynamicModule {
    return {
      module: ApplicationModule,
      providers: [{ provide: SessionProvider, useValue: session }],
      exports: [{ provide: SessionProvider, useValue: session }],
    };
  }
}
