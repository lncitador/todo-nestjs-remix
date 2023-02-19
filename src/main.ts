import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

const session = {
  name: '__session',
  maxAge: 60 * 60 * 24,
  httpOnly: true,
  sameSite: 'strict' as const,
  secrets: [process.env.SESSION_SECRET],
};

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule.register({ session }));
  await app.listen(3000);
}
bootstrap();
