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
          <form className="w-2/5 ">
            <div className="flex">
              <button
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                className="z-10 inline-flex items-center flex-shrink-0 gap-1 p-4 text-sm font-medium text-center text-gray-900 capitalize bg-gray-100 border border-gray-300 rounded-l-sm hover:bg-gray-200 focus:outline-none hover:text-red-500"
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

              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="z-20 block w-full p-4 text-sm text-gray-900 border border-l-2 border-gray-300 rounded-r-lg bg-gray-50 border-l-gray-50 focus:outline-none"
                  placeholder="Search"
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-4 text-sm bg-red-500 border border-red-500 rounded-r-sm"
                >
                  <FiSearch size={20} />
                </button>
              </div>
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
                <span className="absolute top-0 flex items-center justify-center w-4 h-4 text-xs bg-red-500 rounded-full ltr:-left-2 rtl:-right-2">
                  {totalItems}
                </span>
              </div>
              <div>
                <h3 className=" text-neutral-400">{t('cart')}</h3>
                <FormatNumber
                  value={totalPrice}
                  withCurrency={false}
                  styles={{ root: 'text-sm text-white' }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
      <DrawerView opened={openSideCart} onClose={() => toggleSideCart()}>
        Drawer
      </DrawerView>
    </>
  );
}
