import { AiOutlineStar, AiOutlineHeart } from 'react-icons/ai';
import { BiLayer } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import FormatNumber from '@/utils/format-number';
import { useAddToCart } from '@/apis/cart';
import LoadingOverlay from '@/utils/overlay';

type TShoppingItem = {
  name: string;
  price: number;
  colors: { _id: string; name: string }[];
  images: string[];
  sizes: string[];
  _id: string;
};

export default function ProductItem({
  name,
  price,
  colors,
  images,
  sizes,
  _id,
}: TShoppingItem) {
  const { mutate: addToCart, isLoading } = useAddToCart({
    amount: 1,
    color: colors[0]._id,
    productId: _id,
    size: sizes[0],
  });
  return (
    <div className="group relative flex flex-col border-r p-4">
      <LoadingOverlay visible={isLoading} />
      <div className="relative mb-2 flex flex-col overflow-hidden">
        <div className="absolute z-[5] rounded-md bg-green-600 px-3 text-sm text-white">
          <p>-7%</p>
        </div>
        <Link to={`/products/${_id}`} className="mx-auto ">
          <img
            className="h-[230px] w-[230px] cursor-pointer object-contain transition-all duration-300 group-hover:scale-110"
            src={images[0]}
            alt="product-img"
          />
        </Link>
        {/* onHover Container */}
        <div className="absolute -end-10 top-0 flex flex-col gap-2 text-gray-500 transition-all duration-300 group-hover:end-0">
          <div className="group/wishlist relative">
            <div className="cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-red-500 hover:text-white">
              <AiOutlineHeart size={24} />
            </div>
            <span className="pointer-events-none invisible absolute end-12 top-8 -translate-y-full whitespace-nowrap rounded-md bg-gray-500 px-2 py-1 text-sm text-white opacity-0 transition group-hover:visible group-hover/wishlist:opacity-100">
              WishList
            </span>
          </div>

          <div className="group/compare relative">
            <div className="cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-red-500 hover:text-white">
              <BiLayer size={24} />
            </div>
            <span className="pointer-events-none invisible absolute end-12 top-8 -translate-y-full whitespace-nowrap rounded-md bg-gray-500 px-2 py-1 text-sm text-white opacity-0 transition group-hover:visible group-hover/compare:opacity-100">
              Compare
            </span>
          </div>
        </div>
      </div>
      {/* ---------- Title & Stars & Price ------------ */}
      <div className="mb-4 flex flex-col gap-2">
        <h1 className="line-clamp-2 font-semibold capitalize text-blue-700">
          {name}
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-500 ">
            {[...Array(5).keys()].map((el) => {
              const lastStar = 4;
              if (lastStar === el) {
                return <AiOutlineStar key={el} className="text-gray-400" />;
              }
              return <AiOutlineStar key={el} />;
            })}
          </div>
          <div className="text-sm text-gray-400">
            <p>01 review</p>
          </div>
        </div>
        <FormatNumber value={price} />
      </div>
      {/* Buttons */}
      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          className="rounded-md bg-red-500 py-3 text-sm font-semibold uppercase text-white"
          onClick={() => addToCart()}
        >
          Add To Cart
        </button>
        <button
          type="button"
          className="rounded-md border-2 border-gray-300 py-3 text-sm font-semibold uppercase text-gray-500 "
        >
          quick view
        </button>
      </div>
    </div>
  );
}
