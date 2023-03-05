import { Body, Injectable } from '@nestjs/common';
import { ActionArgs, redirect } from '@remix-run/node';
import { typedjson as json } from 'remix-typedjson';
import { Action, Loader, RemixArgs } from 'nest-remix';
import { isTheme, Theme } from '~/app/contexts/theme';
import { themeStorage } from '../storage/theme.cookie';
import { Maybe } from '~/shared/domain/logic';

@Injectable()
export class SetThemeBackend {
  @Action.Post()
  public async setTheme(
    @Body() { theme }: { theme: Theme },
    @RemixArgs() { request }: ActionArgs,
  ) {
    const cookie = request.headers.get('Cookie');
    const themeSession = await SetThemeBackend.getSession(cookie);

    if (!isTheme(theme)) {
      return json({
        success: false,
        message: `theme value of ${theme} is not a valid theme`,
      });
    }

    themeSession.setTheme(theme);

    return json(
      { success: true },
      { headers: { 'Set-Cookie': await themeSession.commit() } },
    );
  }

  @Loader()
  public async notEnabled() {
    return redirect('/', { status: 404 });
  }

  public static async getSession(cookieHeader: Maybe<string>) {
    const session = await themeStorage.getSession(cookieHeader);

    return {
      getTheme: () => {
        const themeValue = session.get('theme');
        return isTheme(themeValue) ? themeValue : null;
      },
      setTheme: (theme: Theme) => session.set('theme', theme),
      commit: () => themeStorage.commitSession(session),
    };
  }
}
