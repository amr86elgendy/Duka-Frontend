import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '@/context/cart';
import CartItem from '@/components/cart/cartItem';
import FormatNumber from '@/utils/format-number';
import { useDeleteCart } from '@/apis/cart';
import LoadingOverlay from '@/utils/overlay';

export default function Cart() {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cart: { items, shippingFee, totalItems, totalPrice, _id },
  } = useCartContext();
  const { mutate: clearCart, isLoading } = useDeleteCart();

  return (
    <section className="container grid grid-cols-[3fr_1fr] gap-4">
      <div className="relative p-6 bg-white rounded-md">
        <LoadingOverlay visible={isLoading} />
        <h1 className="mb-6 text-2xl font-semibold text-gray-800 capitalize">
          your cart
        </h1>
        <div className="flex items-center justify-between pb-4 mb-4">
          <p className="text-gray-400">{totalItems} items in total</p>
          <button
            type="button"
            onClick={() => clearCart()}
            className="px-6 py-2 text-red-500 capitalize rounded-full bg-red-50"
          >
            clear all
          </button>
        </div>
        <hr />
        <div className="grid gap-4">
          {items.map((item, idx) => (
            <Fragment key={item._id}>
              <CartItem {...item} />
              {idx + 1 !== items.length && <hr />}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 bg-white rounded-md h-max">
        <h1 className="pb-4 mb-4 text-2xl font-semibold text-gray-800 capitalize border-b">
          cart summary
        </h1>

        <div className="flex items-center justify-between mb-2 capitalize">
          <p>subtotal</p>
          <FormatNumber value={totalPrice} />
        </div>
        <div className="flex items-center justify-between pb-4 mb-4 capitalize border-b border-gray-300">
          <p>shipping</p>
          <FormatNumber value={shippingFee} />
        </div>
        <div className="flex items-center justify-between mb-4 font-semibold text-red-500 capitalize">
          <p className="text-black">total</p>
          <FormatNumber value={totalPrice + shippingFee} />
        </div>
        <Link
          to="/checkout"
          className="py-3 font-semibold text-center text-white capitalize bg-red-500 rounded-md"
        >
          proceed to checkout
        </Link>
      </div>
    </section>
  );
}
