import { InputHTMLAttributes } from 'react';
import { Controller, Path, RegisterOptions } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import useToggle from '@/hooks/useToggle';

type PasswordInputProps<TFormValues> = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: Path<TFormValues>;
  rules: RegisterOptions;
};

export default function PasswordInput<TFormValues>({
  label,
  name,
  rules,
  ...rest
}: PasswordInputProps<TFormValues>) {
  const [type, toggleType] = useToggle(['password', 'text']);
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
            <div className="relative">
              <input
                {...field}
                {...rest}
                type={type}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 outline-none sm:text-sm"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => toggleType()}
              >
                {type === 'password' ? (
                  <IoEyeOffOutline size={22} className="text-gray-500" />
                ) : (
                  <IoEyeOutline size={22} className="text-gray-500" />
                )}
              </button>
            </div>
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
