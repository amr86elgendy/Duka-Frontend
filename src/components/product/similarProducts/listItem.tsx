import { AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import FormatNumber from '@/utils/format-number';
import { useAddToCart } from '@/apis/cart';
import LoadingOverlay from '@/utils/overlay';

type TListItem = {
  _id: string;
  name: string;
  images: string[];
  colors: { _id: string; name: string }[];
  sizes: string[];
  quantity: number;
  price: number;
};

export default function ListItem({
  _id,
  name,
  images,
  colors,
  sizes,
  quantity,
  price,
}: TListItem) {
  const { mutate: addToCart, isLoading } = useAddToCart({
    amount: 1,
    color: colors[0]._id,
    productId: _id,
    size: sizes[0],
  });
  return (
    <div className="group relative grid grid-cols-[2fr_4fr]  gap-4 p-4  border border-gray-300 rounded-md">
      <LoadingOverlay visible={isLoading} />
      <div className="overflow-hidden rounded-md">
        <Link to={`/products/${_id}`}>
          <img
            className="object-contain w-full h-full transition-all duration-300 group-hover:scale-110"
            src={images[0]}
            alt=""
          />
        </Link>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between gap-2 ">
          <Link
            to={`/products/${_id}`}
            className="block mb-2 text-sm font-semibold text-gray-700 capitalize hover:text-red-500"
          >
            {name.substring(0, 30)} ...
          </Link>
          <p className="flex-shrink-0 text-xs text-green-600">
            {quantity} in stock
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-500 ">
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-400">01 review</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <FormatNumber value={price} />
          <h3 className="text-gray-500 line-through">$599.99</h3>
        </div>
        <div className="flex justify-between gap-2 mt-auto">
          <button
            type="button"
            className="flex-1 py-3 text-sm font-semibold text-white bg-red-500 rounded-md"
            onClick={() => addToCart()}
          >
            Add to cart
          </button>
          <button
            type="button"
            className="flex-1 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md"
          >
            Quick view
          </button>
        </div>
      </div>
    </div>
  );
}
