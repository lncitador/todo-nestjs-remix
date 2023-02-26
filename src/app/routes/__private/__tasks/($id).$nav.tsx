import { LoaderFunction } from '@remix-run/node';
import { useTypedLoaderData as useLoaderData } from 'remix-typedjson';
import { wireLoader } from 'nest-remix/core.server';
import React from 'react';
import { NavTasksBackend } from '~/modules/tasks/server/nav-tasks.server';
import { Outlet } from '@remix-run/react';
import { ListTasks } from '~/app/templates/ListTasks';

type DataFunction = NavTasksBackend['sortTasks'];

export const loader: LoaderFunction = (args) =>
  wireLoader(NavTasksBackend, args);

const NavTasks: React.FC = () => {
  const { task, tasks } = useLoaderData<DataFunction>();

  if (task) {
    return (
      <React.Fragment>
        <ListTasks tasks={[task]} />
        <Outlet />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ListTasks tasks={tasks || []} />
      <Outlet />
    </React.Fragment>
  );
};

export default NavTasks;
