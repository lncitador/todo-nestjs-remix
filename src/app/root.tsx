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

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindcss },
];

export const loader = async ({ request }: LoaderArgs) => {
  const themeSession = await getThemeSession(request);

  return json({
    theme: themeSession.getTheme(),
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
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
