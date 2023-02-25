import { Listbox, Transition } from '@headlessui/react';
import { CaretDown, Check } from 'phosphor-react';
import React from 'react';
import { useStore } from '~/app/hooks/useStore';
import { sortList } from '~/app/utils/sort-list';

export const SortBy: React.FC = () => {
  const [sortBy, toggle] = useStore((state) => state.useSortBy);

  return (
    <Listbox value={sortBy} onChange={toggle}>
      <div className="relative ">
        <Listbox.Button className="w-48 text-left input-style">
          <span className="block truncate">{sortBy.title}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <CaretDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 dark:bg-slate-900 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {sortList.map((sortItem, sortIndex) => (
              <Listbox.Option
                key={sortIndex}
                className={({ selected }) =>
                  `
                                            py-2 pl-10 pr-4 cursor-pointer select-none relative
                                            ${
                                              selected
                                                ? 'font-semibold text-violet-600 bg-violet-100 dark:bg-slate-800 dark:text-violet-500'
                                                : ''
                                            }
                                        }`
                }
                value={sortItem}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {sortItem.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                        <Check className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
