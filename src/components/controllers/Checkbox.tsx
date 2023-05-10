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
              className="w-4 h-4 border-gray-300 rounded"
              type="checkbox"
            />
            <label
              htmlFor={rest.id ? rest.id : ''}
              className="block ml-2 text-sm text-gray-900"
            >
              {label}
            </label>
          </div>
        );
      }}
    />
  );
}
