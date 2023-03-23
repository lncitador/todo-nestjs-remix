import { Body, Injectable } from '@nestjs/common';
import { ActionArgs, redirect } from '@remix-run/node';
import { typedjson as json } from 'remix-typedjson';
import { randomUUID } from 'crypto';
import { Action, RemixArgs } from 'nest-remix';
import { UserSchema } from '~/libs/zod';
import { SessionProvider } from '~/modules/authenticator/domain/providers/session.provider';
import { IUsersRepository } from '~/modules/users/domain/repositories/users.repository';
import { IEncryptPassword } from '~/shared/domain/interfaces/encrypt-password.interface';
import { ILogger } from '~/shared/domain/interfaces/logger.interface';
import { z } from 'zod';

export const SessionSchema = UserSchema.pick({ email: true, password: true });

type SessionType = z.infer<typeof SessionSchema>;

@Injectable()
export class SignInBackend {
  constructor(
    private readonly logger: ILogger,
    private readonly usersRepository: IUsersRepository,
    private readonly encryptPassword: IEncryptPassword,
    private readonly sessionManager: SessionProvider,
  ) {}

  @Action.Post()
  public async createSession(
    @Body() body: SessionType,
    @RemixArgs() { request }: ActionArgs,
  ) {
    const validate = await SessionSchema.safeParseAsync(body);

    if (validate.success === false) {
      return json({
        message: 'Check your credentials',
        errors: validate.error?.flatten().fieldErrors,
      });
    }

    const [err, user] = await this.usersRepository.findByEmail(body.email);

    if (err) {
      this.logger.debug(JSON.stringify(err));

      return json({
        message: 'Check your credentials',
        errors: {},
      });
    }

    const passwordMatch = await this.encryptPassword.compare(
      body.password,
      user.password,
    );

    if (!passwordMatch) {
      return json({
        message: 'Check your credentials',
        errors: {},
      });
    }

    let cookieHeader = request.headers.get('Cookie');
    const session = await this.sessionManager.get(cookieHeader);

    session.set('userId', user.id);
    session.set('sessionId', randomUUID());

    cookieHeader = await this.sessionManager.commit(session);

    return redirect('/', {
      status: 303,
      headers: {
        'Set-Cookie': cookieHeader,
      },
    });
  }
}
