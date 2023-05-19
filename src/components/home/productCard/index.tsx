import { AiOutlineEye, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { BiLayer } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import FormatNumber from '@/utils/format-number';
import { useAddToCart } from '@/apis/cart';
import LoadingOverlay from '@/utils/overlay';

type TProductCard = {
  name: string;
  images: string[];
  price: number;
  colors: { _id: string; name: string }[];
  sizes: string[];
  _id: string;
};

export default function ProductCard({
  name,
  images,
  price,
  colors,
  sizes,
  _id,
}: TProductCard) {
  const { mutate: addToCart, isLoading } = useAddToCart({
    amount: 1,
    color: colors[0]._id,
    productId: _id,
    size: sizes[0],
  });

  return (
    <div className="relative flex flex-col w-56 p-4 bg-white group">
      <LoadingOverlay visible={isLoading} />
      <div className="relative overflow-hidden w-[177px] h-[177px] mb-2">
        <div className="absolute z-10 px-3 text-sm text-white bg-green-600 rounded-md">
          <p>-7%</p>
        </div>
        <Link to={`/products/${_id}`}>
          <img
            className="object-contain w-full h-full transition-all duration-300 cursor-pointer group-hover:scale-110"
            src={images[0]}
            alt="product-img"
          />
        </Link>
        <div className="absolute top-0 flex flex-col gap-2 text-gray-500 transition-all duration-300 -right-10 group-hover:right-0">
          <div className="relative group/quickview">
            <div className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-red-500 hover:text-white">
              <AiOutlineEye size={24} />
            </div>
            <span className="bg-gray-500 text-white absolute z-50 top-8 right-[43px] -translate-y-full whitespace-nowrap  invisible opacity-0 px-2 py-1 text-sm rounded-md group-hover/quickview:visible group-hover/quickview:opacity-100 transition pointer-events-none">
              Quick View
            </span>
          </div>

          <div className="relative group/wishlist">
            <div className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-red-500 hover:text-white">
              <AiOutlineHeart size={24} />
            </div>
            <span className="bg-gray-500 text-white absolute top-8 right-[43px] -translate-y-full whitespace-nowrap  invisible opacity-0 px-2 py-1 text-sm rounded-md group-hover:visible group-hover/wishlist:opacity-100 transition pointer-events-none">
              WishList
            </span>
          </div>

          <div className="relative group/compare">
            <div className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-red-500 hover:text-white">
              <BiLayer size={24} />
            </div>
            <span className="bg-gray-500 text-white absolute top-8 right-[43px] -translate-y-full whitespace-nowrap  invisible opacity-0 px-2 py-1 text-sm rounded-md group-hover:visible group-hover/compare:opacity-100 transition pointer-events-none">
              Compare
            </span>
          </div>
        </div>
      </div>

      {/* ---------------------------- */}
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="font-semibold text-blue-700 capitalize line-clamp-2">
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

      <button
        type="button"
        className="py-3 mt-auto text-sm font-semibold text-white capitalize bg-red-500 rounded-md"
        onClick={() => addToCart()}
      >
        Add To Cart
      </button>
    </div>
  );
}