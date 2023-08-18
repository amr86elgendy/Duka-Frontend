import { ButtonHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { CircleLoadingIcon } from '@/assets/icons';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export default function MyButton({
  children,
  isLoading,
  className,
  ...rest
}: TButtonProps) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      disabled={isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-md px-10 py-3 font-semibold text-white ${className} ${
        isLoading ? 'bg-red-300' : 'bg-red-500'
      }`}
      {...rest}
    >
      {isLoading ? (
        <>
          <CircleLoadingIcon
            color="white"
            className="mr-3 inline h-4 w-4 animate-spin"
          />
          {t('loading')}...
        </>
      ) : (
        children
      )}
    </button>
  );
}
