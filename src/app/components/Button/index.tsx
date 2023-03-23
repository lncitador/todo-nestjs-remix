import clsx from 'clsx';

export function Button({
  className,
  ...props
}: JSX.IntrinsicElements['button']) {
  return (
    <button
      {...props}
      className={clsx(
        'bg-sky-600 hover:bg-sky-700 py-3 px-6 text-slate-50 rounded-lg transition dark:bg-sky-800 dark:hover:bg-sky-900',
        className,
      )}
    >
      {props.children}
    </button>
  );
}
