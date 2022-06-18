import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { environment } from './environments/environment';

const resources = {
  en: {
    translation: {
      appName: 'Social app',
      noDataToDisplay: 'No data to display',
      signOut: 'Sign out',
      appVersion: 'App version: {{version}}',
      searchPeople: 'Search people',
      follow: 'Follow',
      unfollow: 'Unfollow',
      profile: 'Profile',
      whatIsHappening: 'What is happening?',
      charsRemaining: 'Chars remaining',
    },
  },
  uk: {
    translation: {
      appName: 'Соц. мережа',
      signOut: 'Вийти',
      noDataToDisplay: 'Немає даних для відображення',
      appVersion: 'Версія додатку: {{version}}',
      searchPeople: 'Пошук людей',
      follow: 'Підписатись',
      unfollow: 'Відписатись',
      profile: 'Профіль',
      whatIsHappening: 'Що відбувається?',
      charsRemaining: 'Символів залишилось',
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: !environment.production,
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: true },
  });

export default i18n;
