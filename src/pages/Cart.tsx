import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '@/components/cart/cartItem';
import FormatNumber from '@/utils/format-number';
import { useDeleteCart, useGetCart } from '@/apis/cart';
import LoadingOverlay from '@/utils/overlay';
import LoaderFallback from '@/components/UI/Loader';

export default function Cart() {
  const { data: cart, isLoading: loadCart } = useGetCart();
  const { mutate: clearCart, isLoading } = useDeleteCart();

  if (loadCart) {
    return <LoaderFallback />;
  }
  return cart && cart.items.length > 0 ? (
    <section className="container grid grid-cols-[3fr_1fr] gap-4">
      <div className="relative rounded-md bg-white p-6">
        <LoadingOverlay visible={isLoading} />
        <h1 className="mb-6 text-2xl font-semibold capitalize text-gray-800">
          your cart
        </h1>
        <div className="mb-4 flex items-center justify-between pb-4">
          <p className="text-gray-400">{cart.totalItems} items in total</p>
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
          {cart.items.map((item, idx, arr) => (
            <Fragment key={item._id}>
              <CartItem {...item} />
              {idx + 1 !== arr.length && <hr />}
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
          <FormatNumber value={cart.totalPrice} withCurrency={false} />
        </div>
        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4 capitalize">
          <p>shipping</p>
          <FormatNumber value={cart.shippingFee} withCurrency={false} />
        </div>
        <div className="mb-4 flex items-center justify-between font-semibold capitalize text-red-500">
          <p className="text-black">total</p>
          <FormatNumber value={cart.totalPrice + cart.shippingFee} />
        </div>
        <Link
          to="/checkout"
          className="rounded-md bg-red-500 py-3 text-center font-semibold capitalize text-white"
        >
          proceed to checkout
        </Link>
      </div>
    </section>
  ) : (
    <div className="flex h-96 flex-col items-center justify-center gap-12">
      <img
        src="images/noCartFound.svg"
        className="w-52 "
        alt="No products found in cart"
      />
      <h1 className="text-center text-xl font-semibold text-gray-800">
        No products found in cart
      </h1>
    </div>
  );
}
