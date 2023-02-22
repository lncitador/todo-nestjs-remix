import React from 'react';
import { ReactNode } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fullWidth?: boolean;
  helperText?: string;
  error?: {
    message: string;
  };
}

export function InputField({
  name,
  label,
  id,
  placeholder,
  onChange,
  error,
  className,
  fullWidth,
  helperText,
  ...props
}: InputFieldProps) {
  const [isDirty, setIsDirty] = React.useState(false);
  const inputId = id || `input-${name}-field`;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
    setIsDirty(true);
  }

  if (props.type === 'checkbox' || props.type === 'radio') {
    throw new Error(
      `InputField does not support ${props.type} inputs. Please use CheckboxField or RadioField instead.`,
    );
  }

  return (
    <div>
      <label htmlFor={inputId} className={placeholder ? '' : 'sr-only'}>
        {label}
      </label>
      <input
        {...props}
        onChange={handleChange}
        id={inputId}
        name={name}
        className={`form-input ${
          !!error
            ? 'input-style-error'
            : isDirty
            ? 'input-style-dirty'
            : 'input-style'
        } ${className} ${fullWidth ? 'w-full' : ''} ${
          placeholder ? 'mt-2' : ''
        }`}
        placeholder={placeholder || label}
      />
      {!!error ? (
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      ) : (
        <p className="mt-1 text-xs text-gray-500">{helperText} &nbsp;</p>
      )}
    </div>
  );
}
