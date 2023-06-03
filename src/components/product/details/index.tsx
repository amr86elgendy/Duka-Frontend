import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FormatNumber from '@/utils/format-number';
import RatingStars from '@/utils/ratingStars';

type TProductDetail = {
  _id: string;
  category: { _id: string; name: string };
  description: string;
  images: string[];
  name: string;
  numReviews: number;
  averageRating: number;
  price: number;
};

export default function ProductDetail({
  _id,
  category,
  description,
  images,
  name,
  numReviews,
  averageRating,
  price,
}: TProductDetail) {
  const { t } = useTranslation();
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    setActiveImg(images[0]);
    return () => console.log('clean up');
  }, [images]);

  return (
    <>
      {/* {isOpen && <Model ActiveImg={ActiveImg} />} */}
      <div className="grid grid-cols-2 gap-8">
        {/* --------- IMG ----------- */}
        <div className="flex flex-col gap-4 ">
          <div
            className="w-full cursor-zoom-in overflow-hidden rounded-md border border-gray-300 p-4"
            // onClick={() => dispatch(openModel())}
          >
            <img
              className="h-[505px] w-[505px] object-contain"
              src={activeImg}
              alt=""
            />
          </div>
          <div className="flex gap-4">
            {images.map((image) => (
              <button
                type="button"
                key={image}
                className={`h-16 w-16 cursor-pointer overflow-hidden rounded-md border p-2 ${
                  image === activeImg ? 'border-red-500' : 'border-gray-300'
                }`}
                onClick={() => {
                  setActiveImg(image);
                }}
              >
                <img
                  className="h-full w-full object-contain"
                  src={image}
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>

        {/* --------- Details ----------- */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-2xl font-semibold text-blue-700">{name}</h1>
          <div className="mb-4 flex items-center gap-4">
            <RatingStars averageRating={averageRating} />
            <p className="border-l border-r px-4 text-sm text-gray-400">
              {numReviews} review
            </p>
            <button
              type="button"
              className="text-sm capitalize text-gray-400 hover:text-red-500"
              onClick={() =>
                window.scroll({
                  top: 860,
                  behavior: 'smooth',
                })
              }
            >
              Add your review
            </button>
          </div>
          <div className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-6">
            <FormatNumber value={price} />
            {/* <h3 className="text-xl text-gray-500 line-through">$599.99</h3> */}
          </div>
          <ul className="mb-6 text-gray-500">
            <li>{description}</li>
          </ul>
          <div className="mb-6 flex justify-between gap-4 border-b border-gray-200 pb-6">
            <button
              type="button"
              className="flex-grow rounded-md bg-red-500 py-3 font-semibold text-white"
            >
              {t('add-to-cart')}
            </button>
            <div className="flex items-center gap-4">
              <div className=" flex h-full w-[48px] cursor-pointer items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
                -
              </div>
              <h3>1</h3>
              <div className=" flex h-full w-[48px] cursor-pointer items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
                +
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_2fr]">
            <p>SKU:</p>
            <p className="text-gray-500">{_id}</p>
            <p>Category:</p>
            <p className="capitalize text-gray-500">{category.name}</p>
            <p>Tags:</p>
            <p className="text-gray-500">Digital, Headphone</p>
          </div>
        </div>
      </div>
    </>
  );
}
