import { useMemo } from 'react';
import {
  useGetCart,
  useIncreaseItemByOne,
  useReduceItemByOne,
} from '@/apis/cart';
import { LoaderIcon } from '@/assets/icons';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/UI/button';

type TCartControls = {
  productId: string;
  color?: string;
};

export default function CartControls({ productId, color }: TCartControls) {
  const { data: cart } = useGetCart();
  const { mutate: increaseByOne, isLoading: loadIncrease } =
    useIncreaseItemByOne();
  const { mutate: reduceByOne, isLoading: loadReduce } = useReduceItemByOne();

  const cartItem = useMemo(() => {
    if (cart) {
      const { items } = cart;
      if (color) {
        return items.find(
          (item) =>
            item.product._id === productId && item.selectedColor._id === color
        );
      }
      return items.find((item) => item.product._id === productId);
    }
    return undefined;
  }, [cart, color]);

  return (
    <div className="flex items-center justify-evenly gap-4 text-black">
      <Button
        variant="outline"
        size="icon"
        // className="h-10 w-12 "
        onClick={() =>
          reduceByOne(cartItem!._id, {
            onSuccess: () =>
              toast({
                title: 'Product reduced Successfully',
                description: 'You can view your cart or proceed to',
              }),
          })
        }
        disabled={!cartItem || loadIncrease || loadReduce}
      >
        {loadReduce ? <LoaderIcon width={18} height={18} /> : '-'}
      </Button>
      <h3>{cartItem ? cartItem.amount : 0}</h3>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          increaseByOne(cartItem!._id, {
            onSuccess: () =>
              toast({
                title: 'Product Added Successfully',
                description: 'You can view your cart or proceed to',
              }),
          })
        }
        disabled={loadIncrease || loadReduce}
      >
        {loadIncrease ? <LoaderIcon width={18} height={18} /> : '+'}
      </Button>
    </div>
  );
}
