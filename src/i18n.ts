import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import Cookies from 'js-cookie';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: false,
    supportedLngs: ['ar', 'en'],
    fallbackLng: 'ar',
    lng: Cookies.get('ishop_lang') || 'ar',
    fallbackNS: 'common',
    ns: ['common'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage'],
      caches: ['cookie', 'localStorage'],
      lookupCookie: 'ishop_lang',
      lookupLocalStorage: 'ishop_lang',
    },
  });

// console.log(i18n.t('cake', {count: 1}))

export default i18n;
