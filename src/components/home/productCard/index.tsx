import { useTranslation } from 'react-i18next';
import { AiOutlineEye, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { BiLayer } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import FormatNumber from '@/utils/format-number';
import { useGetCart } from '@/apis/cart';
import { useQuickViewContext } from '@/context/quickView';
import AddToCartBtn from '@/utils/addToCartBtn';
import CartControls from '@/utils/cartControls';

type TProductCard = {
  name: string;
  description: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  colors: { _id: string; name: string }[];
  sizes: string[];
  numReviews: number;
  _id: string;
};

export default function ProductCard({
  name,
  description,
  images,
  price,
  priceAfterDiscount,
  colors,
  sizes,
  numReviews,
  _id,
}: TProductCard) {
  const { t } = useTranslation();
  const { dispatch } = useQuickViewContext();

  const { data: cart } = useGetCart();

  const isExisted = cart?.items.find((item) => item.product._id === _id);

  const priceDifference = price - priceAfterDiscount;
  const discountPercent = ((priceDifference * 100) / price).toFixed(0);

  return (
    <div className="group flex flex-col bg-white p-4">
      <div className="relative mb-2 h-44 overflow-hidden">
        {priceDifference > 0 && (
          <div className="absolute z-10 rounded-md bg-green-600 px-3 text-sm text-white">
            <p>-{discountPercent}%</p>
          </div>
        )}
        <Link to={`/products/${_id}`}>
          <img
            className="h-full w-full cursor-pointer object-contain transition-all duration-300 group-hover:scale-110"
            src={images[0]}
            alt="product-img"
          />
        </Link>
        <div className="absolute -end-10 top-0 flex flex-col gap-2 text-gray-500 transition-all duration-300 group-hover:end-0">
          <button
            type="button"
            className="group/quickview relative"
            onClick={() =>
              dispatch('SET_VIEW', {
                name,
                description,
                colors,
                image: images[0],
                price,
                numReviews,
              })
            }
          >
            <span className="flex cursor-pointer items-center justify-center rounded-md bg-gray-100 p-1.5 hover:bg-red-500 hover:text-white">
              <AiOutlineEye size={22} />
            </span>
            <span className="pointer-events-none invisible absolute end-10 top-1/2 z-50  -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-500 px-2 py-1 text-xs text-white opacity-0 transition group-hover/quickview:visible group-hover/quickview:opacity-100">
              {t('quick-view')}
            </span>
          </button>

          <div className="group/wishlist relative">
            <div className="flex cursor-pointer items-center justify-center rounded-md bg-gray-100 p-1.5 hover:bg-red-500 hover:text-white">
              <AiOutlineHeart size={22} />
            </div>
            <span className="pointer-events-none invisible absolute end-10 top-1/2 -translate-y-1/2 whitespace-nowrap  rounded-md bg-gray-500 px-2 py-1 text-xs text-white opacity-0 transition group-hover:visible group-hover/wishlist:opacity-100">
              WishList
            </span>
          </div>

          <div className="group/compare relative">
            <div className="flex cursor-pointer items-center justify-center rounded-md bg-gray-100 p-1.5 hover:bg-red-500 hover:text-white">
              <BiLayer size={22} />
            </div>
            <span className="pointer-events-none invisible absolute end-10 top-1/2 -translate-y-1/2 whitespace-nowrap  rounded-md bg-gray-500 px-2 py-1 text-xs text-white opacity-0 transition group-hover:visible group-hover/compare:opacity-100">
              Compare
            </span>
          </div>
        </div>
      </div>

      {/* ---------------------------- */}
      <div className="my-4 flex flex-col gap-2">
        <h1 className="line-clamp-2 text-center text-sm font-semibold capitalize text-blue-700">
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
            <p>
              {numReviews} {t('reviews', { count: numReviews })}
            </p>
          </div>
        </div>
        <FormatNumber value={price} />
      </div>

      {isExisted ? (
        <CartControls productId={_id} />
      ) : (
        <AddToCartBtn color={colors[0]._id} productId={_id} size={sizes[0]} />
      )}
    </div>
  );
}
