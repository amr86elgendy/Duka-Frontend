import { useTranslation } from 'react-i18next';
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
  priceAfterDiscount: number;
};

export default function ListItem({
  _id,
  name,
  images,
  colors,
  sizes,
  quantity,
  price,
  priceAfterDiscount,
}: TListItem) {
  const { t } = useTranslation();
  const { mutate: addToCart, isLoading } = useAddToCart();
  const priceDifference = price - priceAfterDiscount;
  return (
    <div className="group relative grid grid-cols-[2fr_4fr]  gap-4 rounded-md  border border-gray-300 p-4">
      <LoadingOverlay visible={isLoading} />
      <div className="overflow-hidden rounded-md">
        <Link to={`/products/${_id}`}>
          <img
            className="h-full w-full object-contain transition-all duration-300 group-hover:scale-110"
            src={images[0]}
            alt=""
          />
        </Link>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between gap-2 ">
          <Link
            to={`/products/${_id}`}
            className="mb-2 line-clamp-2 text-xs font-semibold capitalize text-gray-700 hover:text-red-500"
          >
            {name}
          </Link>
          <p className="flex-shrink-0 text-xs text-green-600">
            {quantity} in stock
          </p>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex text-yellow-500 ">
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar className="text-gray-400" />
          </div>
          <p className="text-xs text-gray-400">01 review</p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <FormatNumber
            value={priceDifference > 0 ? priceAfterDiscount : price}
          />
          {priceDifference > 0 && (
            <FormatNumber
              value={price}
              withCurrency={false}
              styles={{
                root: {
                  color: 'gray',
                  textDecoration: 'line-through',
                  fontWeight: 'normal',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                },
              }}
            />
          )}
        </div>
        <div className="mt-auto flex justify-between gap-2">
          <button
            type="button"
            className="flex-1 rounded-md bg-red-500 py-2 text-xs font-semibold text-white"
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
            className="flex-1 rounded-md border border-gray-300 text-xs font-semibold text-gray-700"
          >
            {t('quick-view')}
          </button>
        </div>
      </div>
    </div>
  );
}
