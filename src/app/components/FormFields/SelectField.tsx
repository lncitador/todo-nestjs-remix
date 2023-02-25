import { Listbox, Transition } from '@headlessui/react';
import { error } from 'console';
import { isDirty } from 'nestjs-zod/z';
import React from 'react';
import { ReactNode } from 'react';

interface SelectFieldProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  fullWidth?: boolean;
  helperText?: string;
  options: { value: string; label: string }[];
  error?: {
    message: string;
  };
}

export function SelectField({
  name,
  label,
  id,
  className,
  fullWidth,
  helperText,
  placeholder,
  defaultValue,
  options,
  error,
  ...props
}: SelectFieldProps) {
  const inputId = id || `input-${name}-field`;
  const [isDirty, setIsDirty] = React.useState(false);

  return (
    <div>
      <label htmlFor={inputId} className={placeholder ? '' : 'sr-only'}>
        {label}
      </label>
      <Listbox>
        <div className="relative ">
          <Listbox.Button
            {...props}
            id={inputId}
            name={name}
            defaultValue={options.length > 0 ? defaultValue : ''}
            className={`
                  text-left
              ${
                !!error
                  ? 'input-style-error'
                  : isDirty
                  ? 'input-style-dirty'
                  : 'input-style'
              } ${className} ${fullWidth ? 'w-full' : ''} ${
              placeholder ? 'mt-2' : ''
            }`}
            placeholder={placeholder}
            onChange={(e: any) => {
              setIsDirty(true);
              props.onChange?.(e);
            }}
          >
            {({ value }) => (
              <>
                {value
                  ? options.find((option) => option.value === value)?.label ||
                    'No options'
                  : 'Select an option'}
              </>
            )}
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:bg-slate-900 max-h-60 focus:outline-none sm:text-sm">
              {options.length === 0 && (
                <Listbox.Option
                  className="relative py-4 pl-3 cursor-pointer select-none"
                  value=""
                  disabled
                >
                  No options
                </Listbox.Option>
              )}
              {options?.map((option, key) => (
                <Listbox.Option
                  key={key}
                  className={({ disabled, selected }) =>
                    `
                      py-4 pl-3 pr-9 cursor-pointer select-none relative
                      ${
                        disabled
                          ? 'opacity-50 dark:opacity-30 cursor-not-allowed'
                          : ''
                      }
                      ${
                        selected ? 'font-semibold text-white bg-violet-600' : ''
                      }
                  }`
                  }
                  value={option.value}
                  // disabled={option.props.disabled}
                >
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {!!error ? (
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      ) : (
        <p className="mt-1 text-xs text-gray-500">{helperText} &nbsp;</p>
      )}
    </div>
  );
}
