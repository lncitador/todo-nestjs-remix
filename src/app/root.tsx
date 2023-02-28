import { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import {
  typedjson as json,
  useTypedLoaderData as useLoaderData,
} from 'remix-typedjson';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import {
  useTheme,
  ThemeHead,
  ThemeBody,
  ThemeProvider,
} from './contexts/theme';
import { getThemeSession } from './utils/theme.server';
import tailwindcss from './tailwind.css';
import clsx from 'clsx';
import { StoreProvider } from './contexts/store';
import { SetStoreBackend } from '~/shared/infrastructure/server/set-store.server';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindcss },
];

export const loader = async ({ request }: LoaderArgs) => {
  const cookie = request.headers.get('Cookie');
  const themeSession = await getThemeSession(request);
  const storeSession = await SetStoreBackend.getSession(cookie);

  return json({
    theme: themeSession.getTheme(),
    store: storeSession.state,
  });
};

function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body className="min-h-screen text-xs bg-slate-200 text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm">
        <Outlet />
        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const { store, theme } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </ThemeProvider>
  );
}
