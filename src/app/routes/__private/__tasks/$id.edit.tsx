import { LoaderFunction } from '@remix-run/node';
import { wireLoader } from 'nest-remix/core.server';
import React from 'react';
import { EditTaskModal } from '~/app/components/Modals/EditTaskModal';
import { useTypedLoaderData as useLoaderData } from 'remix-typedjson';
import { TaskByIdBackend } from '~/modules/tasks/server/task-by-id.server';
import { ListTasks } from '~/app/templates/ListTasks';

export const loader: LoaderFunction = (args) =>
  wireLoader(TaskByIdBackend, args);

const Task: React.FC = () => {
  const { task } = useLoaderData<TaskByIdBackend['load']>();

  return (
    <React.Fragment>
      <ListTasks tasks={[task]} />
      <EditTaskModal />
    </React.Fragment>
  );
};

export default Task;
