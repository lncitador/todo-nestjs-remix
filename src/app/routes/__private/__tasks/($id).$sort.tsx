import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { wireLoader } from 'nest-remix/core.server';
import React from 'react';
import { SortTasksBackend } from './($id).$sort.server';

type DataFunction = SortTasksBackend['sortTasks'];

export const loader: LoaderFunction = (args) =>
  wireLoader(SortTasksBackend, args);

const TasksImportants: React.FC = () => {
  const { task, tasks } = useLoaderData<DataFunction>();

  return <div>Fazendo sort nas tasks</div>;
};

export default TasksImportants;
