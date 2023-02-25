import { Dialog } from '@headlessui/react';
import { Form } from '@remix-run/react';
import { Trash, X } from 'phosphor-react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const DeleteDirectoryModal: React.FC = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const [open, setOpen] = React.useState(false);

  const directoryId = searchParam.get('directoryId');

  function toggle() {
    setOpen((prev) => !prev);
  }

  //   const { mutate } = trpc.directories.delete.useMutation();

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     mutate(
  //       { id: directoryId! },
  //       {
  //         onSuccess: () => {
  //           searchParam.delete('directoryId');
  //           toast.success('Directory deleted successfully');

  //           queryClient.invalidateQueries(trpc.directories.list.getQueryKey());
  //           queryClient.invalidateQueries(trpc.todos.getByUser.getQueryKey());

  //           setOpen(false);

  //           setSearchParam((prev) => {
  //             prev.delete('directoryId');

  //             return prev;
  //           });
  //         },
  //         onError: useErrorHandler(),
  //       },
  //     );
  //   };

  return (
    <React.Fragment>
      <button onClick={toggle} aria-label="Delete" className="ml-2">
        <Trash weight="fill" size={18} />
      </button>
      <Dialog open={open} onClose={toggle} className="relative z-30">
        <Dialog.Overlay className="fixed inset-0 bg-black/[.2]" />
        <Dialog.Panel className="fixed w-1/3 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <Form
            method="delete"
            className="w-full p-5 bg-white rounded-md shadow-lg dark:bg-slate-800"
          >
            <Dialog.Title className="text-xl font-medium text-gray-900 dark:text-slate-200">
              Delete directory
              <button onClick={toggle} className="absolute right-5 top-5">
                <X weight="bold" />
              </button>
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-lg text-gray-500 dark:text-slate-300">
              Are you sure you want to delete this directory? All of its
              contents will be permanently removed. This action cannot be
              undone.
            </Dialog.Description>
            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={toggle}
                className="text-sm text-gray-500 dark:text-slate-300 hover:text-gray-700 dark:hover:text-slate-100"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 ml-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                type="submit"
              >
                Delete
              </button>
            </div>
          </Form>
        </Dialog.Panel>
      </Dialog>
    </React.Fragment>
  );
};
