import { Moon, Sun } from 'phosphor-react';
import React from 'react';
import { Theme, useTheme } from '~/app/contexts/theme';

export const SwitchTheme: React.FC = () => {
  const [mode, setTheme] = useTheme();
  const [mounted, setMounted] = React.useState(false);

  function toggle() {
    setTheme(mode === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button className="flex items-center mt-8 text-left" onClick={toggle}>
      <span className="flex-1 text-sm font-medium text-slate-600 dark:text-slate-200">
        {mode === 'dark' ? 'Light' : 'Dark'} Mode
      </span>
      <div className="flex">
        <div className="mr-2 w-10 h-5 bg-slate-200 rounded-full px-0.5 dark:bg-slate-700/[.3] relative flex items-center dark:justify-end">
          <div className="absolute w-4 h-4 rounded-full bg-sky-600"></div>
        </div>
        {mode === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
      </div>
    </button>
  );
};
