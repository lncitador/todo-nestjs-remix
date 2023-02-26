import { Pencil, UserCircle } from 'phosphor-react';
import { SwitchTheme } from '../components/SwitchTheme';
import { firstLastName } from '../utils/first-last-name';
import { useTypedLoaderData as useLoaderData } from 'remix-typedjson';
import { Button } from '../components/Button';
import { ProgressTasks } from '../components/ProgressTasks';

export const Aside: React.FC<{ className?: string }> = ({ className }) => {
  //   const { handleLogout } = useAuth();
  const { user } = useLoaderData<{ user: any }>(); // Todo: type this
  //   const { data } = trpc.auth.user.useQuery();
  //   const { mutateAsync } = trpc.users.updateAvatar.useMutation(); // Todo: Create a action to update avatar

  const name = user?.name ? firstLastName(user.name) : 'Guest';

  //   const handleUpdateAvatar = async () => {
  //     await mutateAsync({ avatar: 'https://i.pravatar.cc/150?img=56' });
  //   };

  return (
    <aside
      className={`bg-slate-100 h-screen w-60 xl:w-2/12 dark:bg-slate-800 z-20 ${className}`}
    >
      <section className="flex flex-col h-full p-5">
        <span className="flex items-center">
          {user?.avatar ? (
            <img className="w-10 ml-4 rounded-full" src={user.avatar} />
          ) : (
            <UserCircle size={40} weight="fill" />
          )}
          <span className="mx-3 font-medium line-clamp-1">Hi, {name}!</span>
          <Button className="ml-auto px-[14px]">
            <Pencil className="font-semibold max-xl:font-medium" />
          </Button>
        </span>
        <SwitchTheme />
        <div className="flex-1">
          <ProgressTasks />
        </div>
        <Button
          onClick={() => console.log('Sign Out')}
          className="w-full bg-rose-100 text-rose-600 transition hover:bg-rose-200 dark:bg-slate-700/[.3] dark:text-slate-200"
        >
          Sign Out
        </Button>
      </section>
    </aside>
  );
};
