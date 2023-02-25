import { Body, Injectable } from '@nestjs/common';
import { ActionArgs, json, redirect } from '@remix-run/node';
import { randomUUID } from 'crypto';
import { Action, RemixArgs } from 'nest-remix';
import { z } from 'nestjs-zod/z';
import { UserModel } from '~/libs/zod';
import { SessionProvider } from '~/modules/authenticator/domain/providers/session.provider';
import { IUsersRepository } from '~/modules/users/domain/repositories/users.repository';
import { IEncryptPassword } from '~/shared/domain/interfaces/encrypt-password.interface';
import { ILogger } from '~/shared/domain/interfaces/logger.interface';

const SessionSchema = UserModel.pick({ email: true, password: true });

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
    const senha = await this.encryptPassword.encrypt('Asdf1234!');
    console.log(senha);
    const validate = await SessionSchema.safeParseAsync(body);

    if (validate.success === false) {
      return json({
        message: 'Check your credentials',
        errors: validate.error?.flatten().fieldErrors,
      });
    }

    const user = await this.usersRepository.findByEmail(body.email);

    if (user.isLeft()) {
      this.logger.debug(JSON.stringify(user.value));

      return json({
        message: 'Check your credentials',
        errors: {},
      });
    }

    const passwordMatch = await this.encryptPassword.compare(
      body.password,
      user.value.password,
    );

    if (!passwordMatch) {
      return json({
        message: 'Check your credentials',
        errors: {},
      });
    }

    let cookieHeader = request.headers.get('Cookie');
    const session = await this.sessionManager.get(cookieHeader);

    session.set('userId', user.value);
    session.set('sessionId', randomUUID());

    cookieHeader = await this.sessionManager.commit(session);

    return redirect('/dashboard', {
      status: 303,
      headers: {
        'Set-Cookie': cookieHeader,
      },
    });
  }
}
