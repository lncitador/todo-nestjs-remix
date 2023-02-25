interface CheckboxFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  checkboxClassName?: string;
}

export function CheckboxField({
  label,
  id,
  checkboxClassName,
  className,
  name,
  ...props
}: CheckboxFieldProps) {
  const inputId = id || `input-${name}-field`;

  return (
    <div className={`flex items-center ${className || ''}`}>
      <input
        {...props}
        id={inputId}
        name={name}
        type="checkbox"
        className={`form-checkbox bg-slate-100 dark:bg-slate-900 dark:border-violet-600 checked:dark:bg-violet-600 text-violet-600 rounded outline-transparent border-2 border-violet-500 hover:border-violet-600 focus:border-violet-600 focus:outline-none transition ${
          checkboxClassName || ''
        }`}
      />
      <label
        htmlFor={name}
        className="block ml-2 text-sm text-gray-900 dark:text-gray-400"
      >
        {label}
      </label>
    </div>
  );
}
