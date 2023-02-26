import React from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from '@remix-run/react';
import { useStore } from '../hooks/useStore';
import { links } from '../utils/links';
import { Header } from './Header';
import { Hero } from './Hero';
import { useTypedLoaderData as useLoaderData } from 'remix-typedjson';
import { LoadingBatchTasksBackend } from '~/modules/tasks/server/loading-batch-tasks.server';

export const Main: React.FC = () => {
  const { tasks } = useLoaderData<LoadingBatchTasksBackend['load']>();
  const route = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [, base] = route.pathname.split('/');
  const currentPath = base === 'all' || !base ? '/' : `/${base}`;

  const [total] = useStore((state) => state.useTotal);

  const title = links.find((link) => link.path === currentPath)?.name;
  const task = tasks?.find((task) => task.id === base);

  return (
    <main className="min-h-screen px-3 pt-5 pb-8 m-auto sm:pb-16 md:px-8 md:w-full xl:w-8/12 max-xl:m-0">
      <Header />
      <section>
        {currentPath === '/results' ? (
          <h1 className="my-5 text-lg font-medium text-center sm:text-left sm:my-8 md:text-2xl dark:text-slate-200">
            Results for "{query}" {`( ${total} tasks )`}
          </h1>
        ) : (
          <h1 className="my-5 text-lg font-medium text-center sm:text-left sm:my-8 md:text-2xl dark:text-slate-200">
            {task ? (
              <>
                {`${task.title} result`}

                <NavLink
                  className="ml-2 text-sm text-rose-500 hover:text-rose-400"
                  to="/"
                >
                  Go back
                </NavLink>
              </>
            ) : (
              <>{`${title} ( ${total} tasks )`}</>
            )}
          </h1>
        )}
        <Hero />
        <Outlet />
      </section>
    </main>
  );
};
