import { ButtonHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuickViewContext } from '@/context/quickView';

type TQuickViewBtn = ButtonHTMLAttributes<HTMLButtonElement> & {
  colors: { _id: string; name: string }[];
  name: string;
  description: string;
  image: string;
  price: number;
  numReviews: number;
};

export default function QuickViewBtn({
  name,
  description,
  colors,
  image,
  price,
  numReviews,
  className,
}: TQuickViewBtn) {
  const { t } = useTranslation();
  const { dispatch } = useQuickViewContext();
  return (
    <button
      type="button"
      className={`rounded-md border border-gray-300 text-sm font-semibold capitalize text-gray-500 ${className}`}
      onClick={() =>
        dispatch('SET_VIEW', {
          name,
          description,
          colors,
          image,
          price,
          numReviews,
        })
      }
    >
      {t('quick-view')}
    </button>
  );
}
