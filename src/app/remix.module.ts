import * as path from 'path';
import { RemixModule as Remix } from 'nest-remix';
import { SetThemeBackend } from './routes/action/set-theme.server';
import { HelloWorldBackend } from './routes/hello-world.server';

@Remix({
  publicDir: path.join(process.cwd(), 'public'),
  browserBuildDir: path.join(process.cwd(), 'build/'),
  providers: [SetThemeBackend, HelloWorldBackend],
})
export class RemixModule {}
