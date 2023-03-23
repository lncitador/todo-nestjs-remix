import clsx from 'clsx';
import React from 'react';
import { useField } from 'remix-forms';

export const Input = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input']
>(({ type = 'text', className, ...props }, ref) => {
  const { errors, dirty } = useField();

  return (
    <input
      {...props}
      ref={ref}
      type={type}
      className={clsx(
        'form-input',
        errors
          ? 'input-style-error'
          : dirty
          ? 'input-style-dirty mb-5'
          : 'input-style mb-5',
        'w-full',
        className,
      )}
    />
  );
});
