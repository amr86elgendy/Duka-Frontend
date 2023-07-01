import { useTranslation } from 'react-i18next';
import { useAddToCart } from '@/apis/cart';
import { LoaderIcon } from '@/assets/icons';

type TAddToCartBtn = {
  color: string;
  productId: string;
  size: string;
};

export default function AddToCartBtn({
  color,
  productId,
  size,
}: TAddToCartBtn) {
  const { t } = useTranslation();
  const { mutate: addToCart, isLoading } = useAddToCart();

  return (
    <button
      type="button"
      className="flex flex-grow items-center justify-center rounded-md bg-red-500 py-3 font-semibold text-white"
      onClick={() =>
        addToCart({
          amount: 1,
          color,
          productId,
          size,
        })
      }
    >
      {isLoading ? (
        <LoaderIcon width={22} height={22} stroke="white" />
      ) : (
        t('add-to-cart')
      )}
    </button>
  );
}
