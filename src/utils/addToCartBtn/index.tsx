import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddToCart } from '@/apis/cart';
import { HalfLoaderIcon } from '@/assets/icons';
import { useAuthContext } from '@/context/auth';
import { Button } from '@/components/UI/button';

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
  const location = useLocation();
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
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  return (
    <Button
      variant="destructive"
      disabled={isLoading}
      onClick={handleAddToCart}
      className="text-sm"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <HalfLoaderIcon width={22} height={22} stroke="white" />{' '}
          {t('please-wait')}...
        </div>
      ) : (
        t('add-to-cart')
      )}
    </Button>
  );
}
