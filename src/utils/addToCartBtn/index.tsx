import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddToCart } from '@/apis/cart';
import { useAuthContext } from '@/context/auth';
import { Button } from '@/components/UI/button';
import { toast } from '@/hooks/use-toast';

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
      addToCart(
        {
          amount: 1,
          color,
          productId,
          size,
        },
        {
          onSuccess: () =>
            toast({
              title: 'Product Added Successfully',
              description: 'You can view your cart or proceed to',
            }),
        }
      );
    } else {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  return (
    <Button variant="destructive" loading={isLoading} onClick={handleAddToCart}>
      {t('add-to-cart')}
    </Button>
  );
}
