import React from 'react';
import { NewTaskModal } from '~/app/components/Modals/NewTaskModal';
import { StoreProvider } from '~/app/contexts/store';
import { SideNav, Main, Aside } from '~/app/templates';

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
