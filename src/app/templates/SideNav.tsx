import React from 'react';
import { Button } from '../components/Button';
import { Directories } from '../components/Directories';
import { NavLinks } from '../components/NavLinks';
import { useStore } from '../hooks/useStore';

export const SideNav: React.FC<{ className?: string }> = ({ className }) => {
  const [, toggleNewTask] = useStore((state) => state.useNewTaskModal);

  return (
    <nav
      className={`bg-slate-100 h-screen w-60 xl:w-2/12 dark:bg-slate-800 z-20 ${className}`}
    >
      <header className="flex flex-col">
        <h1 className="hidden mt-8 text-lg font-bold tracking-wide text-center uppercase xl:block">
          To-do list
        </h1>
        <Button onClick={toggleNewTask} className="mx-4 my-8">
          Add new task
        </Button>
      </header>
      <NavLinks />
      <Directories />
    </nav>
  );
};
