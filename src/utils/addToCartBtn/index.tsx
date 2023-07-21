import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAddToCart } from '@/apis/cart';
import { LoaderIcon } from '@/assets/icons';
import { useAuthContext } from '@/context/auth';
import Button from '@/components/services/Button';

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
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: addToCart, isLoading } = useAddToCart();

  function handleAddToCart() {
    if (isAuthenticated) {
      addToCart({
        amount: 1,
        color,
        productId,
        size,
      });
    } else {
      navigate('/login');
    }
  }

  return (
    // <button
    //   type="button"
    //   className="flex flex-grow items-center justify-center rounded-md bg-red-500 py-3 font-semibold text-white"
    //   onClick={handleAddToCart}
    // >
    //   {isLoading ? (
    //     <LoaderIcon width={22} height={22} stroke="white" />
    //   ) : (
    //     t('add-to-cart')
    //   )}
    // </button>
    <Button isLoading={isLoading} onClick={handleAddToCart} className="text-sm">
      {t('add-to-cart')}
    </Button>
  );
}
