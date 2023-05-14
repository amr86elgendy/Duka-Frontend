import { BiTrash } from 'react-icons/bi';
import { useIncreaseItemByOne, useReduceItemByOne } from '@/apis/cart';
import FormatNumber from '@/utils/format-number';

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
  // console.log({
  //   _id,
  //   product,
  //   amount,
  //   selectedColor,
  //   selectedSize,
  //   totalProductPrice,
  // });

  const { mutate: increaseByOne, isLoading: loadIncrease } =
    useIncreaseItemByOne(_id);
  const { mutate: reduceByOne, isLoading: loadReduce } =
    useReduceItemByOne(_id);

  return (
    <article className="relative flex gap-2 p-8 rounded-md">
      <div
        className={`absolute inset-0 z-10 bg-white opacity-50 ${
          loadIncrease || loadReduce ? 'block' : 'hidden'
        }`}
      />
      <div className="flex items-center w-36">
        <img src={product.images[0]} alt="" className="object-cover" />
      </div>
      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <h1 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h1>
          <button type="button">
            <BiTrash size={24} color="red" />
          </button>
        </div>
        <p className="flex items-center gap-4 text-gray-500">
          color :{' '}
          <span
            className="inline-block w-4 h-4 rounded-sm"
            style={{ backgroundColor: selectedColor.name }}
          />
        </p>
        <p className="flex items-center gap-4 text-gray-500">
          size : <span className="text-lg font-semibold">{selectedSize}</span>
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex items-center justify-center w-10 border rounded-md cursor-pointer hover:bg-gray-300 aspect-square"
              onClick={() => reduceByOne()}
            >
              -
            </button>
            <h3>{amount}</h3>
            <button
              type="button"
              className="flex items-center justify-center w-10 border rounded-md cursor-pointer hover:bg-gray-300 aspect-square"
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
