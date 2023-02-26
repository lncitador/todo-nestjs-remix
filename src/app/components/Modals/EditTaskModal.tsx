import { Dialog } from '@headlessui/react';
import { Form, useLocation, useNavigate, useParams } from '@remix-run/react';
import { useTypedLoaderData as useLoaderData } from 'remix-typedjson';
import { X } from 'phosphor-react';
import React, { useEffect } from 'react';
import { Button } from '../Button';
// import { toast } from 'react-toastify';
import {
  InputField,
  TextAreaField,
  SelectField,
  CheckboxField,
} from '../FormFields';
import { TaskByIdBackend } from '~/modules/tasks/server/task-by-id.server';

export const EditTaskModal: React.FC = () => {
  const params = useParams();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const { task, directories } = useLoaderData<TaskByIdBackend['load']>();

  //   const { data: task } = trpc.todos.getById.useQuery({ id: params.id! });
  //   const { data: directories } = trpc.directories.list.useQuery();

  //   const { mutate: updateTodo } = trpc.todos.update.useMutation();

  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
    const path = pathname.split('/')[1];

    navigate({
      pathname: `/${path === 'all' ? '' : path}`,
      search,
    });
  }

  //   const methods = useForm<CreateTodoInput>();

  //   const handleSubmit = methods.handleSubmit((data) =>
  //     updateTodo(data, {
  //       onSuccess: () => {
  //         toast.success('Task updated successfully');

  //         queryClient.invalidateQueries({
  //           queryKey: trpc.todos.getByUser.getQueryKey(),
  //         });
  //       },
  //       onError: useErrorHandler(methods.setError),
  //     }),
  //   );

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog
      className="relative z-30 text-xs text-slate-600 dark:text-slate-400 xl:text-base sm:text-sm"
      open={open}
      onClose={handleClose}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
      <Dialog.Panel className="fixed w-full max-w-lg p-4 transform -translate-x-1/2 -translate-y-1/2 rounded-lg left-1/2 top-1/2 bg-slate-200 dark:bg-slate-900 sm:p-5">
        <Dialog.Title className="text-xl font-semibold md:text-2xl text-slate-600 dark:text-slate-100">
          Edit task
          <button className="absolute right-5 top-5" onClick={handleClose}>
            <X size={20} />
          </button>
        </Dialog.Title>
        <Form method="put" className="flex flex-col w-full gap-1 mt-4">
          <InputField
            name="title"
            label="Title"
            placeholder="e.g, study for the test"
            fullWidth
            defaultValue={task.title}
          />
          <InputField
            name="dueDate"
            label="Date"
            placeholder="e.g, 2021-12-31"
            type="date"
            defaultValue={task.dueDate.toISOString().split('T')[0]}
            fullWidth
          />
          <TextAreaField
            name="description"
            label="Description (optional)"
            placeholder="e.g, study for the test"
            defaultValue={task.description ?? ''}
            fullWidth
          />
          <SelectField
            name="directoryId"
            label="Select a directory"
            placeholder="e.g, study for the test"
            fullWidth
            defaultValue={task.directoryId}
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
            defaultChecked={task.important}
          />
          <CheckboxField
            name="completed"
            label="Mark as completed"
            className="mb-4"
            defaultChecked={task.completed}
          />

          <Button type="submit" className="w-full">
            Update task
          </Button>
        </Form>
      </Dialog.Panel>
    </Dialog>
  );
};
