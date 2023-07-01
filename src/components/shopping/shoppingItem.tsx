import { useTranslation } from 'react-i18next';
import { AiOutlineStar, AiOutlineHeart } from 'react-icons/ai';
import { BiLayer } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import FormatNumber from '@/utils/format-number';
import { useAddToCart } from '@/apis/cart';
import LoadingOverlay from '@/utils/overlay';

type TShoppingItem = {
  name: string;
  price: number;
  priceAfterDiscount: number;
  colors: { _id: string; name: string }[];
  images: string[];
  sizes: string[];
  numReviews: number;
  _id: string;
};

export default function ProductItem({
  name,
  price,
  priceAfterDiscount,
  colors,
  images,
  sizes,
  numReviews,
  _id,
}: TShoppingItem) {
  const { t } = useTranslation();
  const { mutate: addToCart, isLoading } = useAddToCart();
  const priceDifference = price - priceAfterDiscount;
  const discountPercent = ((priceDifference * 100) / price).toFixed(0);

  return (
    <div className="group relative flex flex-col border-r p-4">
      <LoadingOverlay visible={isLoading} />
      <div className="relative mb-2 flex flex-col overflow-hidden">
        {priceDifference > 0 && (
          <div className="absolute z-[5] rounded-md bg-green-600 px-3 text-sm text-white">
            <p>-{discountPercent}%</p>
          </div>
        )}
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
      <div className="my-4 flex flex-col gap-2">
        <p className="line-clamp-2 text-center text-sm font-semibold capitalize text-blue-700 2xl:text-base">
          {name}
        </p>
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
            <p>
              {numReviews} {t('reviews', { count: numReviews })}
            </p>
          </div>
        </div>
        <FormatNumber value={price} />
      </div>
      {/* Buttons */}
      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          className="rounded-md bg-red-500 py-3 text-sm font-semibold uppercase text-white"
          onClick={() =>
            addToCart({
              amount: 1,
              color: colors[0]._id,
              productId: _id,
              size: sizes[0],
            })
          }
        >
          {t('add-to-cart')}
        </button>
        <button
          type="button"
          className="rounded-md border-2 border-gray-300 py-3 text-sm font-semibold uppercase text-gray-500 "
        >
          {t('quick-view')}
        </button>
      </div>
    </div>
  );
}
