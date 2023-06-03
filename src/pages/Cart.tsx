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
      <div className="relative rounded-md bg-white p-6">
        <LoadingOverlay visible={isLoading} />
        <h1 className="mb-6 text-2xl font-semibold capitalize text-gray-800">
          your cart
        </h1>
        <div className="mb-4 flex items-center justify-between pb-4">
          <p className="text-gray-400">{totalItems} items in total</p>
          <button
            type="button"
            onClick={() => clearCart()}
            className="rounded-full bg-red-50 px-6 py-2 capitalize text-red-500"
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

      <div className="flex h-max flex-col justify-between rounded-md bg-white p-6">
        <h1 className="mb-4 border-b pb-4 text-2xl font-semibold capitalize text-gray-800">
          cart summary
        </h1>

        <div className="mb-2 flex items-center justify-between capitalize">
          <p>subtotal</p>
          <FormatNumber value={totalPrice} withCurrency={false} />
        </div>
        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4 capitalize">
          <p>shipping</p>
          <FormatNumber value={shippingFee} withCurrency={false} />
        </div>
        <div className="mb-4 flex items-center justify-between font-semibold capitalize text-red-500">
          <p className="text-black">total</p>
          <FormatNumber value={totalPrice + shippingFee} />
        </div>
        <Link
          to="/checkout"
          className="rounded-md bg-red-500 py-3 text-center font-semibold capitalize text-white"
        >
          proceed to checkout
        </Link>
      </div>
    </section>
  );
}
