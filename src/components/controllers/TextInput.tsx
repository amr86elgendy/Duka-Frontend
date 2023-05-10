import { InputHTMLAttributes } from 'react';
import { Controller, Path, RegisterOptions } from 'react-hook-form';

type TextInputProps<TFormValues> = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: Path<TFormValues>;
  rules: RegisterOptions;
};

export default function TextInput<TFormValues>({
  label,
  name,
  rules,
  ...rest
}: TextInputProps<TFormValues>) {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => {
        return (
          <div>
            <label htmlFor={name} className={label ? '' : 'sr-only'}>
              {label}
            </label>
            <input
              {...field}
              {...rest}
              className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md outline-none appearance-none sm:text-sm"
            />
            {errors[name] && (
              <span className="text-red-500">
                {errors[name]?.message as string}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}
