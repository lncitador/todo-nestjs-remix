import { Todos } from '@prisma/client';
import { useSearchParams } from '@remix-run/react';
import React from 'react';
import { Actions } from './Actions';
import { Content } from './Content';

type TaskProps = {
  task: Todos & { directory: { name: string } };
  index: number;
  listView: 'list' | 'grid';
};

export const Task: React.FC<TaskProps> = ({ task, index, listView }) => {
  const [, setSearchParam] = useSearchParams();

  const handleClick = () => {
    setSearchParam((prev) => ({
      ...prev,
      directoryId: task.directoryId,
    }));
  };

  return (
    <li key={task.id}>
      <button
        onClick={handleClick}
        className={`
            ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem]
            text-center text-ellipsis bg-rose-200 text-rose-600 px-4 py-1 rounded-t-md transition 
            dark:bg-slate-700 dark:text-slate-200 block hover:bg-rose-300 dark:hover:bg-rose-500
        `}
      >
        {task.directory.name}
      </button>
      <article
        className={`
            flex justify-between rounded-md shadow-md transition p-4
            hover:shadow-lg
            ${listView === 'list' ? 'h-20 sm:h-32' : 'h-52 sm:h-64 flex-col'}
            ${
              index === 0
                ? 'bg-violet-600'
                : index % 2 === 1
                ? 'bg-slate-50 dark:bg-slate-800'
                : 'bg-slate-100 dark:bg-slate-800 dark:bg-opacity-50'
            }
        `}
      >
        <Content task={task} index={index} listView={listView} />
        <Actions task={task} index={index} listView={listView} />
      </article>
    </li>
  );
};
