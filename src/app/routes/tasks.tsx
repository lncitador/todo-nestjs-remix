import { json } from '@remix-run/node';
import React from 'react';
import { SideNav, Main, Aside } from '~/app/templates';
import { NewTaskModal } from '../components/Modals/NewTaskModal';
import { StoreProvider } from '../contexts/store';

const TasksLayout: React.FC = () => {
  return (
    <StoreProvider>
      <div className="flex max-xl:flex-col">
        <SideNav className="fixed max-xl:hidden" />
        <Main />
        <Aside className="fixed right-0 max-xl:hidden" />
      </div>
      <NewTaskModal />
    </StoreProvider>
  );
};

export default TasksLayout;
