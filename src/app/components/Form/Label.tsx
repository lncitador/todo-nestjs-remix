import clsx from 'clsx';
import { useField } from 'remix-forms';

type LabelProps = JSX.IntrinsicElements['label'];

export function Label({ children, id, className, ...props }: LabelProps) {
  const { errors } = useField();
  return (
    <label
      {...props}
      htmlFor={id}
      className={clsx(
        errors ? 'text-red-500' : 'text-gray-700 dark:text-gray-300',
        className,
        'block mb-1.5',
      )}
    >
      {children}
    </label>
  );
}
