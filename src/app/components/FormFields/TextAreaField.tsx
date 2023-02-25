import React from 'react';

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  fullWidth?: boolean;
  helperText?: string;
  error?: {
    message: string;
  };
}

export function TextAreaField({
  name,
  label,
  id,
  className,
  fullWidth,
  helperText,
  placeholder,
  defaultValue,
  error,
  ...props
}: TextAreaFieldProps) {
  const inputId = id || `input-${name}-field`;
  const [isDirty, setIsDirty] = React.useState(false);

  return (
    <div>
      <label htmlFor={inputId} className={placeholder ? '' : 'sr-only'}>
        {label}
      </label>
      <textarea
        {...props}
        id={inputId}
        name={name}
        onChange={(e) => {
          setIsDirty(true);
          props.onChange?.(e);
        }}
        defaultValue={defaultValue || ''}
        className={`form-textarea ${
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
