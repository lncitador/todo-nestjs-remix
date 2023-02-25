import { useLoaderData } from '@remix-run/react';
import React from 'react';

export const ProgressTasks: React.FC = () => {
  //   const [searchParam] = useSearchParams();
  const { tasks = [] } = useLoaderData<{ tasks: any[] }>(); // Todo: type this

  //   const directoryId = searchParam.get('directoryId');
  //   const query = searchParam.get('q');

  //   const { data: tasks } = trpc.todos.getByUser.useQuery({
  //     sortBy: 'order-added',
  //     directoryId,
  //     query,
  //   });

  const currentDay = new Date();

  const all = tasks?.length;
  const completed = tasks?.filter((task) => task.completed).length || 0;

  const allOverdueTask = tasks?.filter((task) => {
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(24, 0, 0, 0);
    currentDay.setHours(0, 0, 0, 0);

    return taskDate < currentDay;
  });

  const overdueTask =
    allOverdueTask?.filter((task) => !task.completed).length || 0;

  const progressOverdueTask =
    allOverdueTask && allOverdueTask.length > 0
      ? (allOverdueTask.filter((task) => task.completed).length /
          allOverdueTask.length) *
        100
      : 0;

  const allTodayTask = tasks?.filter((task) => {
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(24, 0, 0, 0);
    currentDay.setHours(0, 0, 0, 0);

    return taskDate.getTime() === currentDay.getTime();
  });

  const todayTask = allTodayTask?.filter((task) => !task.completed).length || 0;

  const progressTodayTask =
    allTodayTask && allTodayTask.length > 0
      ? (allTodayTask.filter((task) => task.completed).length /
          allTodayTask.length) *
        100
      : 0;

  return (
    <React.Fragment>
      <div className="mt-6">
        <span className="flex justify-between mb-2">
          All tasks
          <span>
            {completed}/{all}
          </span>
        </span>
        <ProgressTask percent={all ? (completed / all) * 100 : 0} />
      </div>
      {overdueTask > 0 && (
        <div className="mt-4">
          <span className="flex justify-between mb-2">
            Overdue tasks
            <span>
              {overdueTask}/{allOverdueTask?.length || 0}
            </span>
          </span>
          <ProgressTask percent={progressOverdueTask} />
        </div>
      )}
      {todayTask > 0 ? (
        <div className="mt-4">
          <span className="flex justify-between mb-2">
            Today tasks
            <span>
              {todayTask}/{allTodayTask?.length || 0}
            </span>
          </span>
          <ProgressTask percent={progressTodayTask} />
        </div>
      ) : (
        <div className="mt-4">
          <span className="flex justify-between mb-2">No tasks today</span>
        </div>
      )}
    </React.Fragment>
  );
};

const ProgressTask: React.FC<{ percent: number }> = ({ percent }) => {
  return (
    <div className="flex-1">
      <div className="flex h-2 overflow-hidden text-xs bg-gray-200 rounded-lg dark:bg-slate-700">
        <div
          style={{ width: `${percent}%` }}
          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-violet-600"
        ></div>
      </div>
    </div>
  );
};
