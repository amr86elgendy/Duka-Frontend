import { useState, useEffect } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
// import { showReview } from '../../../store/features/productDetailSlice';
// import Model from '@/components/Model';
import FormatNumber from '@/utils/format-number';

type TProductDetail = {
  _id: string;
  category: { _id: string; name: string };
  description: string;
  images: string[];
  name: string;
  numReviews: number;
  price: number;
};

export default function ProductDetail({
  _id,
  category,
  description,
  images,
  name,
  numReviews,
  price,
}: TProductDetail) {
  const addReviewHandler = () => {
    // dispatch(showReview());
    setTimeout(() => {
      window.scroll({
        top: 860,
        behavior: 'smooth',
      });
    }, 1);
  };

  const [shownPicture, setShownPicture] = useState('');
  useEffect(() => {
    setShownPicture(images[0]);
  }, [images]);

  // const isOpen = useSelector((state) => state.model.isOpen);

  return (
    <>
      {/* {isOpen && <Model shownPicture={shownPicture} />} */}
      <div className="grid grid-cols-2 gap-8">
        {/* --------- IMG ----------- */}
        <div className="flex flex-col gap-4 ">
          <div
            className="w-full overflow-hidden border border-gray-300 rounded-md cursor-zoom-in"
            // onClick={() => dispatch(openModel())}
          >
            <img
              className="w-[505px] h-[505px] object-contain"
              src={shownPicture}
              alt=""
            />
          </div>
          <div className="flex gap-4">
            {images.map((image) => (
              <div
                key={image}
                className={`border rounded-md cursor-pointer w-[70px] h-[70px] overflow-hidden ${
                  image === shownPicture ? 'border-red-500' : 'border-gray-300'
                }`}
                // onClick={() => {
                //   setShownPicture(image);
                // }}
              >
                <img
                  className="object-contain w-full h-full"
                  src={image}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        {/* --------- Details ----------- */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-2xl font-semibold text-blue-700">{name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex text-yellow-500 ">
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar className="text-gray-400" />
            </div>
            <p className="px-4 text-sm text-gray-400 border-l border-r">
              {numReviews} review
            </p>
            <button
              type="button"
              className="text-sm text-gray-400 capitalize hover:text-red-500"
              onClick={addReviewHandler}
            >
              Add your review
            </button>
          </div>
          <div className="flex items-center gap-2 pb-6 mb-6 border-b border-gray-200">
            <FormatNumber value={price} />
            {/* <h3 className="text-xl text-gray-500 line-through">$599.99</h3> */}
          </div>
          <ul className="mb-6 text-gray-500">
            <li>{description}</li>
          </ul>
          <div className="flex justify-between gap-4 pb-6 mb-6 border-b border-gray-200">
            <button
              type="button"
              className="flex-grow py-3 font-semibold text-white bg-red-500 rounded-md"
            >
              Add To Cart
            </button>
            <div className="flex items-center gap-4">
              <div className=" hover:bg-gray-100 cursor-pointer h-full border border-gray-300 rounded-md flex justify-center items-center w-[48px]">
                -
              </div>
              <h3>1</h3>
              <div className=" hover:bg-gray-100 cursor-pointer h-full border border-gray-300 rounded-md flex justify-center items-center w-[48px]">
                +
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_2fr]">
            <p>SKU:</p>
            <p className="text-gray-500">{_id}</p>
            <p>Category:</p>
            <p className="text-gray-500 capitalize">{category.name}</p>
            <p>Tags:</p>
            <p className="text-gray-500">Digital, Headphone</p>
          </div>
        </div>
      </div>
    </>
  );
}
