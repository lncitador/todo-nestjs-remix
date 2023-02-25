import { Sun, Moon } from 'phosphor-react';
import React from 'react';
import { Theme, useTheme } from '~/app/contexts/theme';

export const ToggleTheme: React.FC = () => {
  const [mode, setTheme] = useTheme();
  const [mounted, setMounted] = React.useState(false);

  function toggle() {
    setTheme(mode === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function isDark() {
    return mode === 'dark';
  }

  return (
    <button
      className="p-2 rounded-full focus:outline-none bg-slate-300 dark:bg-slate-800"
      onClick={toggle}
      aria-label="Theme toggle"
    >
      {isDark() ? (
        <Sun size={20} weight="fill" className="text-amber-400" />
      ) : (
        <Moon size={20} weight="fill" />
      )}
    </button>
  );
};
