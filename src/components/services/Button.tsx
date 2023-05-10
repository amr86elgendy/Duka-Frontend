import { ButtonHTMLAttributes } from 'react';
import { CircleLoadingIcon } from '@/assets/icons';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export default function Button({ children, isLoading, ...rest }: TButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full px-10 py-3 font-semibold text-white rounded-md ${
        isLoading ? 'bg-red-300' : 'bg-red-500 '
      }`}
      {...rest}
    >
      {isLoading ? (
        <>
          <CircleLoadingIcon
            color="white"
            className="inline w-4 h-4 mr-3 animate-spin"
          />{' '}
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
