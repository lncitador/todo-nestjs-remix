import clsx from 'clsx';

type ErrorProps = JSX.IntrinsicElements['div'];

export const Error = ({ className, ...props }: ErrorProps) => {
  return <div {...props} className={clsx('text-red-500 text-sm', className)} />;
};
