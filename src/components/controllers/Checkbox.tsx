import { InputHTMLAttributes } from 'react';
import { Controller, Path, RegisterOptions } from 'react-hook-form';

type CheckboxProps<TFormValues> = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
};

export default function Checkbox<TFormValues>({
  label,
  name,
  rules,
  ...rest
}: CheckboxProps<TFormValues>) {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <div className="flex items-center">
            <input
              {...field}
              {...rest}
              className="h-4 w-4 rounded border-gray-300"
              type="checkbox"
            />
            <label
              htmlFor={rest.id ? rest.id : ''}
              className="ml-2 block text-sm text-gray-900"
            >
              {label}
            </label>
          </div>
        );
      }}
    />
  );
}
