import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlass, X } from 'phosphor-react';
import _uniqBy from 'lodash/uniqBy';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '~/app/hooks/useDebounce';
import { useTypedLoaderData as useLoaderData } from 'remix-typedjson';
import { LoadingBatchTasksBackend } from '~/modules/tasks/server/loading-batch-tasks.server';

export const SearchInput: React.FC = () => {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();

  const { tasks } = useLoaderData<LoadingBatchTasksBackend['load']>(); // Todo: type this

  const [searchTerm, setSearchTerm] = useState(() => {
    return searchParam.get('q') || '';
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const queryTerm = useDebounce(searchTerm);

  React.useEffect(() => {
    if (queryTerm) {
      setSearchParam((prev) => {
        prev.set('q', queryTerm);

        return prev;
      });
    } else {
      setSearchParam((prev) => {
        prev.delete('q');

        return prev;
      });
    }
  }, [queryTerm]);

  return (
    <div className="flex-1 col-span-3 row-start-2 md:pr-10">
      <Combobox
        as="form"
        className="relative w-full md:max-w-xs"
        autoComplete="off"
      >
        <Combobox.Label htmlFor="search" className="sr-only"></Combobox.Label>
        <Combobox.Input
          id="search"
          type="search"
          placeholder="Search task"
          value={searchTerm}
          onChange={handleChange}
          className="w-full pr-10 input-style"
        />
        <button
          type="button"
          className="absolute top-0 right-0 flex items-center justify-center w-10 h-full"
          onClick={() => {
            setSearchTerm('');
            setSearchParam((prev) => {
              prev.delete('q');

              return prev;
            });
          }}
        >
          {queryTerm.length > 3 ? (
            <X className="absolute w-4 text-base sm:w-5 sm:text-xl right-4 top-3.5 text-slate-400" />
          ) : (
            <MagnifyingGlass className="absolute w-4 text-base sm:w-5 sm:text-xl right-4 top-3.5 text-slate-400" />
          )}
        </button>
        <Combobox.Options className="absolute z-10 w-full overflow-hidden rounded-md bg-slate-100 top-14 dark:bg-slate-800">
          {_uniqBy(tasks || [], 'title').map((task) => (
            <Combobox.Option
              key={task.id}
              value={task.title}
              className="p-3 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => {
                setSearchTerm(task.title);
                searchParam.set('q', task.title);
                navigate({
                  pathname: '/results',
                  search: searchParam.toString(),
                });
              }}
            >
              {task.title}
            </Combobox.Option>
          ))}
          {tasks?.length === 0 && (
            <div className="p-3 hover:bg-slate-200 dark:hover:bg-slate-700">
              No results found
            </div>
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
