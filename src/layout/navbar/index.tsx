import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BiChevronDown } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation(['navbar']);
  return (
    <nav className="sticky top-0 z-20 bg-primary-1 py-3">
      <div className="container text-white">
        <ul className="flex gap-10">
          <li className="flex cursor-pointer items-center gap-2 hover:text-red-500">
            <RxHamburgerMenu size={24} />
            <Link className="text-sm font-semibold uppercase" to="/">
              {t('all-categories')}
            </Link>
          </li>
          <li>|</li>
          <li className="flex cursor-pointer items-center gap-1 hover:text-red-500">
            <Link to="/" className="text-sm font-semibold uppercase">
              {t('home')}
            </Link>
          </li>
          <li className="flex cursor-pointer items-center gap-1 hover:text-red-500">
            <Link to="products" className="text-sm font-semibold uppercase">
              {t('shop')}
            </Link>
            <BiChevronDown />
          </li>
          <li className="flex cursor-pointer items-center gap-1 hover:text-red-500">
            <Link className="text-sm font-semibold uppercase" to="/">
              {t('blog')}
            </Link>
            <BiChevronDown />
          </li>
          <li className="flex cursor-pointer items-center gap-1 hover:text-red-500">
            <Link className="text-sm font-semibold uppercase" to="/">
              {t('offers')}
            </Link>
            <BiChevronDown />
          </li>
          <li className="flex cursor-pointer items-center gap-1 hover:text-red-500">
            <Link className="text-sm font-semibold uppercase" to="/">
              {t('purchase-now')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
