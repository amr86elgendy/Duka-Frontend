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
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md outline-none appearance-none sm:text-sm"
              />
              <button
                type="button"
                className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-4"
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
