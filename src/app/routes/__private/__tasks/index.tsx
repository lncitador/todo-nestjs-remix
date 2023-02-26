import { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { useTypedLoaderData as useLoaderData } from 'remix-typedjson';
import { wireLoader } from 'nest-remix/core.server';
import React from 'react';
import { ListTasks } from '~/app/templates/ListTasks';
import { AllTasksBackend } from '~/modules/tasks/server/all-tasks.server';

export const loader: LoaderFunction = (args) =>
  wireLoader(AllTasksBackend, args);

const tasks: React.FC = () => {
  const { tasks } = useLoaderData<AllTasksBackend['load']>();

  return (
    <React.Fragment>
      <ListTasks tasks={tasks} />
      <Outlet />
    </React.Fragment>
  );
};

export default tasks;
