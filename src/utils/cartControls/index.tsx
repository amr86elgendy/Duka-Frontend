import { useMemo } from 'react';
import {
  useGetCart,
  useIncreaseItemByOne,
  useReduceItemByOne,
} from '@/apis/cart';
import { LoaderIcon } from '@/assets/icons';

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
      <button
        type="button"
        className=" flex h-12 w-12 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
        onClick={() => reduceByOne(cartItem!._id)}
        disabled={!cartItem}
      >
        {loadReduce ? <LoaderIcon width={16} height={16} /> : '-'}
      </button>
      <h3>{cartItem ? cartItem.amount : 0}</h3>
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
        onClick={() => increaseByOne(cartItem!._id)}
      >
        {loadIncrease ? <LoaderIcon width={16} height={16} /> : '+'}
      </button>
    </div>
  );
}
