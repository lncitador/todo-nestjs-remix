import clsx from 'clsx';
import React from 'react';

export const CheckBox = React.forwardRef<
  HTMLInputElement,
  Omit<JSX.IntrinsicElements['input'], 'type'>
>(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      type="checkbox"
      className={clsx(
        'form-checkbox bg-slate-100 dark:bg-slate-900 dark:border-sky-600 checked:dark:bg-sky-600 text-sky-600 rounded outline-transparent border-2 border-sky-500 hover:border-sky-600 focus:border-sky-600 focus:outline-none transition mb-1.5',
        className,
      )}
    />
  );
});
