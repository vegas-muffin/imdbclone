import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import common_en from "../translations/en";
import common_ru from "../translations/ru";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const Language = ["en", "ru"];

const resources = {
  en: {
    translation: common_en,
  },
  ru: {
    translation: common_ru,
  },
};

i18next
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  //.use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18next;
