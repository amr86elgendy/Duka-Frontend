import { ButtonHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuickViewContext } from '@/context/quickView';
import { Button } from '@/components/UI/button';

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
    <Button
      variant="outline"
      className={className}
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
    </Button>
  );
}
