import clsx from 'clsx';
import React from 'react';
import { useField } from 'remix-forms';

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  JSX.IntrinsicElements['textarea']
>(({ className, ...props }, ref) => {
  const { errors, dirty } = useField();

  return (
    <textarea
      {...props}
      ref={ref}
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
