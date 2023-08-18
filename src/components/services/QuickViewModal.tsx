import { useTranslation } from 'react-i18next';
import { useQuickViewContext } from '@/context/quickView';
import FormatNumber from '@/utils/format-number';
import ModalView from '@/utils/modal';

export default function QuickViewModal() {
  const { t } = useTranslation();
  const { opened, product, dispatch } = useQuickViewContext();

  return (
    <ModalView opened={opened} onClose={() => dispatch('REMOVE_VIEW')}>
      <div className="grid grid-cols-2 gap-8">
        {/* --------- IMG ----------- */}
        <div
          className="items-cneter flex w-full cursor-zoom-in justify-center overflow-hidden rounded-md border border-gray-200 p-4"
          // onClick={() => dispatch(openPictureModel())}
        >
          <img
            className="w-[505px] object-contain"
            src={product?.image}
            alt=""
          />
        </div>

        {/* --------- Details ----------- */}
        <div className="flex flex-col">
          {/* <Link to={`/${product?.id}`}> */}
          <h1 className="mb-2 text-xl font-semibold text-blue-700">
            {product?.name}
          </h1>
          {/* </Link> */}
          <div className="mb-4 flex items-center gap-4">
            <div className="flex text-yellow-500">
              {/* <RatingStars averageRating={product?.averageRating} /> */}
            </div>
            <p className="border-l px-4 text-sm text-gray-400">
              {product?.numReviews} Review
            </p>
          </div>
          <div className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-6">
            <FormatNumber value={product?.price ?? 0} />
          </div>
          <ul className="mb-6 text-sm leading-loose text-gray-500">
            <li>{product?.description}</li>
          </ul>
          {/* colors */}
          <div className="mb-6">
            <h1 className="mb-4 capitalize">{t('colors')} :</h1>
            <div className="flex gap-6">
              {product?.colors.map((color) => (
                <div
                  key={color._id}
                  className="flex h-6 w-6 items-center justify-center rounded-sm outline-offset-4"
                  style={{
                    backgroundColor: color.name,
                    outline: `2px solid ${color.name}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalView>
  );
}
