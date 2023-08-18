import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import EG from '@/assets/flags/EG';
import GB from '@/assets/flags/US';

export default function Topbar() {
  const { t } = useTranslation();
  return (
    <nav className="border-b border-neutral-700 bg-primary-dark py-2 text-white">
      <div className="container grid grid-cols-2 items-center lg:grid-cols-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`flex items-center gap-2 text-xs capitalize ${
              i18next.language === 'ar' && 'cursor-default opacity-50'
            }`}
            onClick={() => i18next.changeLanguage('ar')}
          >
            عربي <EG width={15} style={{ marginTop: 4 }} />
          </button>
          <span className="hidden items-center text-gray-200 sm:flex">|</span>
          <button
            type="button"
            className={`flex items-center gap-2 text-xs capitalize ${
              i18next.language === 'en' && 'cursor-default opacity-50'
            }`}
            onClick={() => i18next.changeLanguage('en')}
          >
            english <GB width={15} />
          </button>
        </div>
        <div className="hidden justify-self-center lg:block">
          {t('topbar-sale')}
        </div>
        <ul className="flex justify-self-end">
          <li className="hidden items-center sm:flex sm:gap-2">
            <FiPhoneCall className="rtl:rotate-[270deg]" />
            0123456789
          </li>
          <span className="mx-2 hidden items-center text-gray-200 sm:flex">
            |
          </span>
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-full transition duration-300 hover:bg-[#3b5a9a]"
            rel="noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-full transition duration-300 hover:bg-[#1aa9e1]"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-full transition duration-300 hover:bg-[#f56040]"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
        </ul>
      </div>
    </nav>
  );
}
