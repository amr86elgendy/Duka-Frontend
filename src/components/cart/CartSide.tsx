import { Dialog } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useAuthContext } from '@/context/auth';
import { useCartContext } from '@/context/cart';
import FormatNumber from '@/utils/format-number';

export default function CartSide({ onClose }: { onClose: () => void }) {
  const { isAuthenticated } = useAuthContext();
  const {
    cart: { items, totalItems, totalPrice },
  } = useCartContext();
  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="flex items-start justify-between">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            Shopping cart
          </Dialog.Title>

          <button
            type="button"
            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <IoClose size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item._id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ms-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/items/${item._id}`}>
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="ms-4">{item.product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.selectedColor.name}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.amount}</p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-8">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <FormatNumber value={totalPrice} />
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <button type="button" onClick={onClose} className="mt-6 w-full">
          <Link
            to="/cart"
            className="flex items-center justify-center rounded-md border border-transparent bg-gray-300 px-6 py-3 text-base font-medium capitalize shadow-sm hover:bg-gray-400"
          >
            view cart
          </Link>
        </button>
        <button type="button" onClick={onClose} className="mt-6 w-full">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium capitalize text-white shadow-sm hover:bg-red-700"
          >
            {isAuthenticated ? 'checkout' : 'login to checkout'}
          </Link>
        </button>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={onClose}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
