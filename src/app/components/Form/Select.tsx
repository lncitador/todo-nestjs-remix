import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { useField } from 'remix-forms';

export const Select = React.forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements['select']
>(
  (
    {
      className,
      name,
      defaultValue,
      id,
      placeholder,
      children,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = React.useState(defaultValue);
    const [dirty, setDirty] = React.useState(false);
    const { errors, options: optionsField } = useField();

    const optionsChildren = React.Children.map(children, (option) => {
      if (React.isValidElement(option)) {
        return {
          name: option.props.children,
          value: option.props.value,
        };
      }
    });

    const options = optionsField || optionsChildren;

    return (
      <Listbox
        {...props}
        name={name}
        value={value}
        ref={ref}
        onChange={(e) => {
          setDirty(true);
          setValue(e);
          onChange?.({
            target: {
              name: name as string,
              value: e as string,
            },
          } as React.ChangeEvent<HTMLSelectElement>);
        }}
      >
        <div className="relative">
          <Listbox.Button
            id={id}
            className={clsx(
              'text-left',
              !!errors
                ? 'input-style-error'
                : dirty
                ? 'input-style-dirty mb-5'
                : 'input-style mb-5',
              'w-full',
              className,
            )}
            placeholder={placeholder}
          >
            {({ value }) => (
              <>
                {value
                  ? options?.find((option) => option.value === value)?.name ||
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
              {options?.length === 0 && (
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
                    clsx(
                      'py-4 pl-3 pr-9 cursor-pointer select-none relative',
                      disabled
                        ? 'opacity-50 dark:opacity-30 cursor-not-allowed'
                        : '',
                      selected ? 'font-semibold text-white bg-sky-600' : '',
                    )
                  }
                  value={option.value}
                >
                  {option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    );
  },
);
