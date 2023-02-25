import { Dialog } from '@headlessui/react';
import { Form, useLoaderData } from '@remix-run/react';
// import { toast } from 'react-toastify';
import { X } from 'phosphor-react';
import { useStore } from '~/app/hooks/useStore';
import { Directory } from '~/libs/prisma';
import { Button } from '../Button';
import {
  InputField,
  TextAreaField,
  SelectField,
  CheckboxField,
} from '../FormFields';

export const NewTaskModal: React.FC = () => {
  const [isOpen, toggle] = useStore((state) => state.useNewTaskModal);

  const { directories } = useLoaderData<{ directories: Directory[] }>();

  //   const { data: directories } = trpc.directories.list.useQuery();
  //   const { mutate } = trpc.todos.create.useMutation();

  //   const methods = useForm<CreateTodoInput>();

  //   const handleSubmit = methods.handleSubmit(
  //     (data) => {
  //       const transformdData = {
  //         ...data,
  //         dueDate: new Date(data.dueDate),
  //       };

  //       mutate(transformdData, {
  //         onSuccess: () => {
  //           toast.success('Your task as sucessful created!');
  //           queryClient.invalidateQueries({
  //             queryKey: trpc.todos.getByUser.getQueryKey(),
  //           });
  //           toggle();
  //         },
  //         onError: useErrorHandler(methods.setError),
  //       });
  //     },
  //     (err) => console.log(err),
  //   );

  return (
    <Dialog
      className="relative z-30 text-slate-600 dark:text-slate-400 xl:text-base sm:text-sm"
      open={isOpen}
      onClose={toggle}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
      <Dialog.Panel className="fixed w-full max-w-lg p-4 transform -translate-x-1/2 -translate-y-1/2 rounded-lg left-1/2 top-1/2 bg-slate-200 dark:bg-slate-900 sm:p-5">
        <Dialog.Title className="text-xl font-semibold md:text-2xl text-slate-600 dark:text-slate-100">
          Create a new task
          <button className="absolute right-5 top-5" onClick={toggle}>
            <X size={20} />
          </button>
        </Dialog.Title>
        <Form method="post" className="flex flex-col w-full gap-1 mt-4">
          <InputField
            name="title"
            label="Title"
            placeholder="e.g, study for the test"
            fullWidth
          />
          <InputField
            name="dueDate"
            label="Date"
            placeholder="e.g, 2021-12-31"
            type="date"
            fullWidth
          />
          <TextAreaField
            name="description"
            label="Description (optional)"
            placeholder="e.g, study for the test"
            fullWidth
          />
          <SelectField
            name="directoryId"
            label="Select a directory"
            placeholder="e.g, study for the test"
            fullWidth
            options={
              directories?.map((directory) => ({
                value: directory.id,
                label: directory.name,
              })) ?? []
            }
          />
          <CheckboxField
            name="important"
            label="Mark as important"
            className="mb-4"
          />
          <CheckboxField
            name="completed"
            label="Mark as completed"
            className="mb-4"
          />

          <Button type="submit" className="w-full">
            Add task
          </Button>
        </Form>
      </Dialog.Panel>
    </Dialog>
  );
};
