import { Dialog } from '@headlessui/react';
import { useFetcher } from '@remix-run/react';
import { Plus, X } from 'phosphor-react';
import React from 'react';
import { InputField } from '../FormFields';

export const CreateDirectoryModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const fetcher = useFetcher();

  const toggle = () => setOpen((prev) => !prev);

  React.useEffect(() => {
    if (fetcher.type === 'done') {
      toggle();
    }
  }, [fetcher.type]);

  return (
    <React.Fragment>
      <div className="w-full px-5 mt-4">
        <button
          onClick={toggle}
          className="flex items-center justify-center w-full px-5 py-2 border-2 border-dashed rounded-md border-slate-300 dark:border-slate-700 hover:text-sky-500"
        >
          <div className="mr-2">
            <Plus weight="bold" />
          </div>
          New directory
        </button>
      </div>
      <Dialog open={open} onClose={toggle} className="relative z-30">
        <Dialog.Overlay className="fixed inset-0 bg-black/[.2]" />
        <Dialog.Panel className="fixed transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <fetcher.Form
            method="post"
            className="w-full p-5 bg-white rounded-md shadow-lg dark:bg-slate-800"
            action="/directories"
          >
            <Dialog.Title className="text-xl font-medium text-gray-900 dark:text-slate-200">
              Create a new directory
              <button onClick={toggle} className="absolute right-5 top-5">
                <X weight="bold" />
              </button>
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-lg text-gray-500 dark:text-slate-400 line-clamp-6">
              This directory will be created in the root of your project.
            </Dialog.Description>
            <div className="flex flex-col w-full mt-4 text-xs text-slate-600 dark:text-slate-400 xl:text-base sm:text-sm">
              <InputField
                label="Name"
                name="name"
                placeholder="My directory"
                className="dark:bg-slate-900 border-slate-200 dark:border-sky-500"
                fullWidth
              />
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                onClick={toggle}
                className="px-4 py-2 mr-2 text-sm font-medium text-gray-500 transition rounded-md bg-slate-200 dark:bg-slate-700 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-md bg-sky-500 hover:bg-sky-600"
                type="submit"
              >
                Create
              </button>
            </div>
          </fetcher.Form>
        </Dialog.Panel>
      </Dialog>
    </React.Fragment>
  );
};
