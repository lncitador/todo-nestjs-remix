import { Todos as Task } from '@prisma/client';
import { NavLink, useLocation } from '@remix-run/react';
import { DotsThreeOutlineVertical, Star, Trash } from 'phosphor-react';
import React from 'react';

interface ActionsProps {
  task: Task;
  index: number;
  listView: 'list' | 'grid';
}

export const Actions: React.FC<ActionsProps> = ({ task, index, listView }) => {
  const location = useLocation();

  return (
    <div
      className={`
            flex border-dashed border-slate-200 dark:border-slate-700/[.3]
            ${
              listView === 'list'
                ? 'items-center'
                : 'border-t-2 w-full pt-4 mt-4'
            }
            ${index === 0 ? 'border-violet-400 dark:border-violet-400' : ''}
        `}
    >
      <button
        title="Mark as completed"
        className={`
            mr-4 rounded-full font-medium
            ${listView === 'list' ? '' : 'order-0'}
            ${
              task.completed
                ? 'bg-emerald-200 text-emerald-800'
                : 'bg-amber-200 text-amber-800'
            }
        `}
        onClick={() => {
          //   handleUpdate(task.id, {
          //     completed: !task.completed,
          //   });
        }}
      >
        <span className="absolute invisible block px-3 py-1 sm:static sm:visible">
          {task.completed ? 'completed' : 'uncompleted'}
        </span>
      </button>
      <button
        title="Mark as important"
        className={`
            transition ml-auto
            ${
              index === 0 && !task.important
                ? 'text-slate-100 hover:text-slate-300'
                : ''
            }
            ${task.important ? 'text-rose-500 hover:text-rose-400' : ''}
        `}
        onClick={() => {
          //   handleUpdate(task.id, {
          //     important: !task.important,
          //   });
        }}
      >
        <Star
          className="w-5 h-5 sm:w-6 sm:h-6"
          weight={task.important ? 'fill' : 'regular'}
        />
      </button>
      <button
        title="Delete task"
        className={`
            transition ml-2
            ${index === 0 ? 'text-slate-100 hover:text-slate-300' : ''}
        `}
        onClick={() => {
          //   handleDelete(task.id);
        }}
      >
        <Trash className="w-5 h-5 sm:w-6 sm:h-6" weight="fill" />
      </button>
      <NavLink
        to={{
          pathname: `${location.pathname === '/' ? 'all' : location.pathname}/${
            task.id
          }/edit`,
          search: location.search,
        }}
        title="More options"
        className={`
            transition ml-1 mt-1
            ${index === 0 ? 'text-slate-100 hover:text-slate-300' : ''}
        `}
      >
        <DotsThreeOutlineVertical
          className="w-5 h-5 sm:w-6 sm:h-6"
          weight="fill"
        />
      </NavLink>
    </div>
  );
};