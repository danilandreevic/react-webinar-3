import { useContext } from 'react';
import translations from '../translations';
import { LanguageContext } from '../store/context';

const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return { t };
};

export default useTranslation;
