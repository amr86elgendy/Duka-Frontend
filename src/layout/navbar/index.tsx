import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BiChevronDown } from 'react-icons/bi';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 py-3 bg-primary-1">
      <div className="container text-white">
        <ul className="flex gap-10">
          <li className="flex items-center gap-2 pr-10 border-r border-gray-500 cursor-pointer hover:text-red-500">
            <RxHamburgerMenu size={24} />
            <Link className="text-sm font-semibold uppercase" to="/">
              all categories
            </Link>
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-red-500">
            <Link to="/" className="text-sm font-semibold uppercase">
              home
            </Link>
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-red-500">
            <Link to="products" className="text-sm font-semibold uppercase">
              shop
            </Link>
            <BiChevronDown />
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-red-500">
            <Link className="text-sm font-semibold uppercase" to="/">
              blog
            </Link>
            <BiChevronDown />
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-red-500">
            <Link className="text-sm font-semibold uppercase" to="/">
              pages
            </Link>
            <BiChevronDown />
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-red-500">
            <Link className="text-sm font-semibold uppercase" to="/">
              purchase now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
