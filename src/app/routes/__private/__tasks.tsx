import { LoaderFunction } from '@remix-run/node';
import { wireLoader } from 'nest-remix/core.server';
import React from 'react';
import { NewTaskModal } from '~/app/components/Modals/NewTaskModal';
import { SideNav, Main, Aside } from '~/app/templates';
import { LoadingBatchTasksBackend } from '~/modules/tasks/server/loading-batch-tasks.server';

export const loader: LoaderFunction = (args) =>
  wireLoader(LoadingBatchTasksBackend, args);

const TasksLayout: React.FC = () => {
  return (
    <div className="flex max-xl:flex-col">
      <SideNav className="fixed max-xl:hidden" />
      <Main />
      <Aside className="fixed right-0 max-xl:hidden" />
      <NewTaskModal />
    </div>
  );
};

export default TasksLayout;
