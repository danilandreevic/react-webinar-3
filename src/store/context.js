import React, {useContext, useState} from 'react';

/**
 * Контекст для Store и Language
 * @type {React.Context<Store>}
 */
export const StoreContext = React.createContext();
export const LanguageContext = React.createContext();
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
