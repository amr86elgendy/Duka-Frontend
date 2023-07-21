import { ButtonHTMLAttributes } from 'react';
import { CircleLoadingIcon } from '@/assets/icons';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export default function Button({
  children,
  isLoading,
  className,
  ...rest
}: TButtonProps) {
  return (
    <button
      type="button"
      disabled={isLoading}
      className={`w-full rounded-md px-10 py-3 font-semibold text-white ${className} ${
        isLoading ? 'bg-red-300' : 'bg-red-500'
      }`}
      {...rest}
    >
      {isLoading ? (
        <>
          <CircleLoadingIcon
            color="white"
            className="mr-3 inline h-4 w-4 animate-spin"
          />{' '}
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
