import { useTranslation } from 'react-i18next';
import { AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import FormatNumber from '@/utils/format-number';
import { TProduct } from '@/apis/shopping';
import QuickViewBtn from '@/utils/quickViewBtn';

export default function ListItem({
  _id,
  name,
  description,
  images,
  quantity,
  colors,
  price,
  numReviews,
  priceAfterDiscount,
}: TProduct) {
  const { t } = useTranslation();
  const priceDifference = price - priceAfterDiscount;
  return (
    <div className="group grid grid-cols-[2fr_4fr] gap-4 rounded-md border border-gray-300 p-4">
      <div className="overflow-hidden rounded-md">
        <Link to={`/products/${_id}`}>
          <img
            className="h-full w-full object-contain transition-all duration-300 group-hover:scale-110"
            src={images[0]}
            alt=""
          />
        </Link>
      </div>
      <div className="flex flex-col items-start">
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

        <QuickViewBtn
          colors={colors}
          description={description}
          name={name}
          image={images[0]}
          numReviews={numReviews}
          price={price}
          className="px-4 py-2 text-xs hover:bg-gray-50"
        />
        {/* <button
            type="button"
            className="rounded-md border border-gray-300 text-xs font-semibold text-gray-700"
          >
            {t('quick-view')}
          </button> */}
      </div>
    </div>
  );
}
