import { useMemo, useState, useEffect } from 'react';
import { HiCheck } from 'react-icons/hi';
import FormatNumber from '@/utils/format-number';
import RatingStars from '@/utils/ratingStars';
import { useGetCart } from '@/apis/cart';
import { TProduct } from '@/apis/shopping';
import AddToCartBtn from '@/utils/addToCartBtn';
import CartControls from '@/utils/cartControls';

export default function ProductDetail({
  _id,
  category,
  description,
  images,
  name,
  numReviews,
  averageRating,
  price,
  colors,
  sizes,
}: TProduct) {
  const [activeImg, setActiveImg] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]._id);

  const { data: cart } = useGetCart();

  const cartItem = useMemo(() => {
    if (cart) {
      const { items } = cart;
      return items.find(
        (item) =>
          item.product._id === _id && item.selectedColor._id === selectedColor
      );
    }
    return undefined;
  }, [cart, selectedColor]);

  console.log('ProductDetail run');

  useEffect(() => {
    setActiveImg(images[0]);
    setSelectedColor(colors[0]._id);
  }, [images, colors]);

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
              alt={name}
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
                  alt={name}
                />
              </button>
            ))}
          </div>
        </div>

        {/* --------- Details ----------- */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-2xl font-semibold text-blue-700">{name}</h1>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex text-yellow-500 ">
              {/* <RatingStars averageRating={averageRating} /> */}
            </div>
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
          </div>
          <ul className="mb-6 text-gray-500">
            <li>{description}</li>
          </ul>
          <div className=" mb-6 flex flex-col gap-4 border-b border-gray-200 pb-6">
            {/* <div className="flex justify-between gap-4">
              <button
                type="button"
                className="flex-grow rounded-md bg-red-500 py-3 font-semibold text-white"
                onClick={() =>
                  addToCart({
                    amount: 1,
                    color: selectedColor,
                    productId: _id,
                    size: sizes[0],
                  })
                }
                disabled={!!cartItem}
              >
                {cartItem ? t('added') : t('add-to-cart')}
              </button>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className=" flex h-full w-12 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
                  onClick={() =>
                    cartItem && cartItem.amount === 1
                      ? removeItem(cartItem._id)
                      : reduceByOne(cartItem!._id)
                  }
                  disabled={!cartItem}
                >
                  -
                </button>
                <h3>{cartItem ? cartItem.amount : 0}</h3>
                <button
                  type="button"
                  className=" flex h-full w-12 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
                  onClick={() =>
                    cartItem
                      ? increaseByOne(cartItem!._id)
                      : addToCart({
                          amount: 1,
                          color: selectedColor,
                          productId: _id,
                          size: sizes[0],
                        })
                  }
                >
                  +
                </button>
              </div>
            </div> */}
            {cartItem ? (
              <CartControls productId={_id} color={selectedColor} />
            ) : (
              <AddToCartBtn
                color={selectedColor}
                productId={_id}
                size={sizes[0]}
              />
            )}

            {/* colors */}
            <div>
              <h1 className="mb-1">Colors</h1>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    type="button"
                    key={color._id}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md"
                    style={{
                      backgroundColor: color.name,
                    }}
                    onClick={() => setSelectedColor(color._id)}
                  >
                    {selectedColor === color._id && (
                      <HiCheck size={20} color="white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* colors */}
          </div>

          <div className="grid grid-cols-[1fr_2fr]">
            <p className="text-sm font-medium text-gray-800">SKU:</p>
            <p className="text-gray-500">{_id}</p>
            <p className="text-sm font-medium text-gray-800">Category:</p>
            <p className="capitalize text-gray-500">{category.name}</p>
            <p className="text-sm font-medium text-gray-800">Tags:</p>
            <p className="text-gray-500">Digital, Headphone</p>
          </div>
        </div>
      </div>
    </>
  );
}
