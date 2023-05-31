import { BiTrash } from 'react-icons/bi';
import {
  useDeleteCartItem,
  useIncreaseItemByOne,
  useReduceItemByOne,
} from '@/apis/cart';
import FormatNumber from '@/utils/format-number';
import LoadingOverlay from '@/utils/overlay';

type TCartItemProp = {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  amount: number;
  selectedColor: {
    _id: string;
    name: string;
  };
  selectedSize: string;
  totalProductPrice: number;
};

export default function CartItem({
  _id,
  product,
  amount,
  selectedColor,
  selectedSize,
  totalProductPrice,
}: TCartItemProp) {
  console.log({
    _id,
    product,
    amount,
    selectedColor,
    selectedSize,
    totalProductPrice,
  });

  const { mutate: increaseByOne, isLoading: loadIncrease } =
    useIncreaseItemByOne(_id);
  const { mutate: reduceByOne, isLoading: loadReduce } =
    useReduceItemByOne(_id);
  const { mutate: deleteItem, isLoading: loadDelete } = useDeleteCartItem(_id);

  return (
    <article className="relative flex gap-8 rounded-md p-8">
      <LoadingOverlay visible={loadIncrease || loadReduce || loadDelete} />
      <div className="flex w-36 items-center">
        <img src={product.images[0]} alt="" className="object-cover" />
      </div>
      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <h1 className="text-lg font-semibold text-gray-800">
            {product.name.length > 50
              ? `${product.name.substring(0, 50)} ...`
              : product.name}
          </h1>
          <button type="button" onClick={() => deleteItem()}>
            <BiTrash size={24} color="red" />
          </button>
        </div>
        <p className="flex items-center gap-4 text-gray-500">
          color :{' '}
          <span
            className="inline-block h-4 w-4 rounded-sm"
            style={{ backgroundColor: selectedColor?.name }}
          />
        </p>
        <p className="flex items-center gap-4 text-gray-500">
          size : <span className="text-lg font-semibold">{selectedSize}</span>
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex aspect-square w-10 cursor-pointer items-center justify-center rounded-md border hover:bg-gray-300"
              onClick={() => reduceByOne()}
            >
              -
            </button>
            <h3>{amount}</h3>
            <button
              type="button"
              className="flex aspect-square w-10 cursor-pointer items-center justify-center rounded-md border hover:bg-gray-300"
              onClick={() => increaseByOne()}
            >
              +
            </button>
          </div>
          <FormatNumber value={totalProductPrice} />
        </div>
      </div>
    </article>
  );
}
