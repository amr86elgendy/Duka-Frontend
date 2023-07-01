import { Dialog } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import CartSideItem from './cartSideItem';
import FormatNumber from '@/utils/format-number';
import { useGetCart } from '@/apis/cart';

export default function CartSide({ onClose }: { onClose: () => void }) {
  const { data: cart } = useGetCart();
  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="z-90 sticky top-0 z-10 w-full border-b bg-white pb-4 pt-6">
          <div className=" flex items-start justify-between sm:px-6 ">
            <Dialog.Title className="text-xl font-semibold text-gray-900 ">
              Shopping cart
            </Dialog.Title>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <IoClose size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 px-6">
          {!cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src="images/noCartFound.svg"
                className="w-1/5 "
                alt="No products found in cart"
              />
              <h1 className="text-center text-gray-800">
                No products found in cart
              </h1>
            </div>
          ) : (
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cart.items?.map((item) => (
                  <CartSideItem key={item._id} {...item} onClose={onClose} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {cart && cart.items.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between gap-2  text-base font-medium text-gray-900">
            <div>
              <p>Subtotal</p>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <FormatNumber value={cart.totalPrice} />
          </div>

          <div className="mt-6 flex justify-between gap-4">
            <Link
              to="/checkout"
              onClick={onClose}
              className=" w-full rounded-md border border-transparent bg-red-500 px-6 py-3 text-center font-medium text-white shadow-sm hover:bg-red-600"
            >
              Checkout
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              className="w-full rounded-md border border-gray-500 px-6 py-3 text-center font-medium text-neutral-700 decoration-solid underline-offset-2 hover:underline"
            >
              View Cart
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <button
                type="button"
                className="font-medium text-neutral-800 hover:text-neutral-700"
                onClick={onClose}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
