import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsHandbag } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import AccountMenu from './AccountMenu';
import { useAuthContext } from '@/context/auth';
import { useCartContext } from '@/context/cart';
import FormatNumber from '@/utils/format-number';
import useToggle from '@/hooks/useToggle';
import DrawerView from '@/utils/drawer';
import CartSide from '@/components/cart/CartSide';

export default function Header() {
  const { t } = useTranslation(['header']);
  const { isAuthenticated } = useAuthContext();
  const {
    cart: { totalPrice, totalItems },
  } = useCartContext();
  const [openSideCart, toggleSideCart] = useToggle();

  return (
    <>
      <header className="bg-[#181F2B] py-6">
        <div className="container flex items-center justify-between text-white">
          <Link to="/">
            <img src="/images/logo.svg" alt="Dujamarket logo" width={210} />
          </Link>

          {/* Search bar */}
          <form className="w-2/5">
            <div className="flex">
              <button
                className="inline-flex flex-shrink-0 items-center gap-1 border border-gray-300 bg-gray-100 p-4 text-sm font-medium capitalize text-gray-900 hover:bg-gray-200 hover:text-red-500 focus:outline-none ltr:rounded-l-sm ltr:rounded-r-none rtl:rounded-l-none rtl:rounded-r-sm"
                type="button"
              >
                {t('all-categories')}
                <BiChevronDown />
              </button>
              {/* <div
            id="dropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style={{
              position: "absolute",
              inset: "auto auto 0px 0px",
              margin: "0px",
              transform: "translate3d(897px, 5637px, 0px)",
            }}
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Mockups
                </button>
              </li>
            </ul>
          </div> */}

              <input
                type="search"
                className="flex-1 border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:outline-none"
                placeholder={t('search')!}
                required
              />
              <button
                type="submit"
                className="border border-red-500 bg-red-500 p-4 text-sm ltr:rounded-r-sm rtl:rounded-l-sm"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>
          <div className="flex gap-8 text-sm">
            {isAuthenticated ? (
              <AccountMenu />
            ) : (
              <Link to="login">
                <h3 className="text-neutral-400">
                  {t('hello')}, <span>{t('sign-in')}</span>
                </h3>
                <h2 className="capitalize">{t('account-lists')}</h2>
              </Link>
            )}
            <Link to="wishlist" className="flex items-center gap-2">
              <div>
                <h3 className=" text-neutral-400">Favorite</h3>
                <h2>My Wishlist</h2>
              </div>
            </Link>
            <button
              type="button"
              className="flex items-center gap-2"
              onClick={() => toggleSideCart()}
            >
              <div className="relative">
                <BsHandbag size={32} />
                <span className="absolute top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm text-xs ltr:-left-2 rtl:-right-2">
                  {totalItems}
                </span>
              </div>
              <div>
                <h3 className=" text-neutral-400">{t('cart')}</h3>
                <FormatNumber
                  value={totalPrice}
                  withCurrency={false}
                  styles={{
                    root: {
                      color: 'white',
                      fontSize: '0.875rem',
                      lineHeight: '1.25rem',
                    },
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
      <DrawerView opened={openSideCart} onClose={() => toggleSideCart()}>
        <CartSide onClose={() => toggleSideCart()} />
      </DrawerView>
    </>
  );
}
