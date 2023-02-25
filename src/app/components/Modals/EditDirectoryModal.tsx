import { Dialog } from '@headlessui/react';
import { Form, useSearchParams } from '@remix-run/react';
import { NotePencil, X } from 'phosphor-react';
import React from 'react';
// import { toast } from 'react-toastify';
import { InputField } from '../FormFields';

export const EditDirectoryModal: React.FC = () => {
  const [searchParam] = useSearchParams();
  const [open, setOpen] = React.useState(false);

  const directoryId = searchParam.get('directoryId');

  //   const { mutate: editDirectory } = trpc.directories.update.useMutation();
  //   const { data: directory } = trpc.directories.getById.useQuery(
  //     {
  //       id: directoryId!,
  //     },
  //     { enabled: !!directoryId },
  //   );

  //   const methods = useForm<{ name: string }>();

  const toggle = () => setOpen((prev) => !prev);

  //   const handleSubmit = methods.handleSubmit((data) => {
  //     editDirectory(
  //       { id: directoryId!, name: data.name },
  //       {
  //         onSuccess: () => {
  //           toast.success('Your directory as sucessful updated!');

  //           queryClient.invalidateQueries(trpc.directories.list.getQueryKey());
  //           queryClient.invalidateQueries(trpc.todos.getByUser.getQueryKey());

  //           toggle();
  //         },
  //         onError: useErrorHandler(methods.setError),
  //       },
  //     );
  //   });

  //   React.useEffect(() => {
  //     if (directory) {
  //       methods.setValue('name', directory.name);
  //     }
  //   }, [directory]);

  return (
    <React.Fragment>
      <button onClick={toggle} aria-label="Edit" className="ml-auto">
        <NotePencil weight="bold" size={18} />
      </button>
      <Dialog open={open} onClose={toggle} className="relative z-30">
        <Dialog.Overlay className="fixed inset-0 bg-black/[.2]" />
        <Dialog.Panel className="fixed w-1/3 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <Form
            method="put"
            className="w-full p-5 bg-white rounded-md shadow-lg dark:bg-slate-800"
          >
            <Dialog.Title className="text-xl font-medium text-gray-900 dark:text-slate-200">
              Edit directory
              <button
                onClick={toggle}
                className="absolute text-gray-500 right-5 top-5 dark:text-slate-300 hover:text-gray-700 dark:hover:text-slate-100"
              >
                <X size={18} />
              </button>
            </Dialog.Title>
            <div className="mt-4 text-xs text-slate-600 dark:text-slate-400 xl:text-base sm:text-sm">
              <InputField
                name="name"
                label="Name"
                placeholder="Name"
                className="dark:bg-slate-900 border-slate-200 dark:border-violet-500"
                fullWidth
              />
            </div>
            <div className="flex justify-end gap-4">
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
                Save
              </button>
            </div>
          </Form>
        </Dialog.Panel>
      </Dialog>
    </React.Fragment>
  );
};
