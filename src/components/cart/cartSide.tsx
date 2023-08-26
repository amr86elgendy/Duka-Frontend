import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsHandbag } from 'react-icons/bs';
import { useGetCart } from '@/apis/cart';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/UI/drawer';
import FormatNumber from '@/utils/format-number';
import CartSideItem from './cartSideItem';
import { Button } from '../UI/button';

export default function CartSide() {
  const {
    t,
    i18n: { language },
  } = useTranslation(['header']);
  const navigate = useNavigate();
  const { data: cart } = useGetCart();
  console.log('CartSide run');

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex items-center gap-2">
          <div className="relative">
            <BsHandbag size={32} />
            <span className="absolute top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm ltr:-left-2 rtl:-right-2">
              {cart?.totalItems ?? 0}
            </span>
          </div>
          <div>
            <h3 className=" text-neutral-400">{t('cart')}</h3>
            {cart ? (
              <FormatNumber
                value={cart.totalPrice}
                withCurrency={false}
                styles={{
                  root: {
                    color: 'white',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                  },
                }}
              />
            ) : (
              '00.00'
            )}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent
        className="grid grid-rows-[auto,1fr]"
        side={language === 'ar' ? 'right' : 'left'}
      >
        <DrawerHeader>
          <DrawerTitle>Shopping cart</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>

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
          <div className="grid h-[calc(100vh-160px)] grid-rows-[1fr,auto,auto] gap-4">
            <ul className="divide-y divide-gray-200 overflow-y-auto">
              {cart.items?.map((item) => (
                <CartSideItem
                  key={item._id}
                  {...item}
                  DrawerClose={DrawerClose}
                />
              ))}
            </ul>

            <hr />

            {/* Footer */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-between gap-2  text-base font-medium text-gray-900">
                <div>
                  <p>Subtotal</p>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                </div>
                <FormatNumber value={cart.totalPrice} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DrawerClose asChild>
                  <Button variant="destructive" asChild>
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button variant="outline" asChild>
                    <Link to="/cart">View Cart</Link>
                  </Button>
                </DrawerClose>
              </div>
              <div className="flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <DrawerClose asChild>
                    <Link
                      to="/products"
                      className="font-medium text-neutral-800 hover:text-neutral-700"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </DrawerClose>
                </p>
              </div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
