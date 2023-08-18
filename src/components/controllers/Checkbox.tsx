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
          <div className="flex items-center gap-2">
            <input
              {...field}
              {...rest}
              className="h-4 w-4 cursor-pointer rounded  border-gray-300"
              type="checkbox"
            />
            <label
              htmlFor={rest.id ? rest.id : ''}
              className="block cursor-pointer text-sm text-gray-900"
            >
              {label}
            </label>
          </div>
        );
      }}
    />
  );
}
