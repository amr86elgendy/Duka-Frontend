import { AiOutlineStar, AiOutlineHeart } from 'react-icons/ai';
import { BiLayer } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import FormatNumber from '@/utils/format-number';
import { useAddToCart } from '@/apis/cart';

type TShoppingItem = {
  name: string;
  price: number;
  colors: string[];
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
    color: colors[0],
    productId: _id,
    size: sizes[0],
  });
  return (
    <div className="relative flex flex-col p-4 border-r group">
      <div
        className={`absolute inset-0 z-10 bg-white opacity-50 ${
          isLoading ? 'block' : 'hidden'
        }`}
      />
      <div className="relative flex flex-col mb-2 overflow-hidden ">
        <div className="absolute z-10 px-3 text-sm text-white bg-green-600 rounded-md">
          <p>-7%</p>
        </div>
        <Link to={`/products/${_id}`} className="mx-auto ">
          <img
            className=" cursor-pointer object-contain group-hover:scale-110 transition-all duration-300 w-[230px] h-[230px]"
            src={images[0]}
            alt="product-img"
          />
        </Link>
        {/* onHover Container */}
        <div className="absolute top-0 flex flex-col gap-2 text-gray-500 transition-all duration-300 -right-10 group-hover:right-0">
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
      {/* ---------- Title & Stars & Price ------------ */}
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
      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-auto">
        <button
          type="button"
          className="py-3 text-sm font-semibold text-white uppercase bg-red-500 rounded-md"
          onClick={() => addToCart()}
        >
          Add To Cart
        </button>
        <button
          type="button"
          className="py-3 text-sm font-semibold text-gray-500 uppercase border-2 border-gray-300 rounded-md "
        >
          quick view
        </button>
      </div>
    </div>
  );
}
