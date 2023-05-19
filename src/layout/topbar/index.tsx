import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import EG from '@/assets/flags/EG';
import GB from '@/assets/flags/US';

export default function Topbar() {
  const { t } = useTranslation();
  return (
    <nav className="py-2 text-white border-b bg-primary bg-primary-0 border-neutral-700">
      <div className="container grid items-center grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`flex text-xs capitalize items-center gap-2 ${
              i18next.language === 'ar' && 'opacity-50 cursor-default'
            }`}
            onClick={() => i18next.changeLanguage('ar')}
          >
            عربي <EG width={15} style={{ marginTop: 4 }} />
          </button>
          <span className="items-center hidden text-gray-200 sm:flex">|</span>
          <button
            type="button"
            className={`text-xs capitalize flex items-center gap-2 ${
              i18next.language === 'en' && 'opacity-50 cursor-default'
            }`}
            onClick={() => i18next.changeLanguage('en')}
          >
            english <GB width={15} />
          </button>
        </div>
        <div className="hidden lg:block justify-self-center">
          {t('topbar-sale')}
        </div>
        <ul className="flex justify-self-end">
          <li className="items-center hidden sm:flex sm:gap-1">
            <FiPhoneCall className="ltr:mr-2 rtl:ml-2" />
            0123456789
          </li>
          <span className="items-center hidden mx-2 text-gray-200 sm:flex">
            |
          </span>
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="flex items-center justify-center w-8 h-8 transition duration-300 rounded-full hover:bg-[#3b5a9a]"
            rel="noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="flex items-center justify-center w-8 h-8 transition duration-300 rounded-full hover:bg-[#1aa9e1]"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="flex items-center justify-center w-8 h-8 transition duration-300 rounded-full hover:bg-[#f56040]"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
        </ul>
      </div>
    </nav>
  );
}
