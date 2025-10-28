import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NewsletterContextType {
  isNewsletterVisible: boolean;
  setNewsletterVisible: (visible: boolean) => void;
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

export const useNewsletter = () => {
  const context = useContext(NewsletterContext);
  if (context === undefined) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
};

interface NewsletterProviderProps {
  children: ReactNode;
}

export const NewsletterProvider: React.FC<NewsletterProviderProps> = ({ children }) => {
  const [isNewsletterVisible, setIsNewsletterVisible] = useState(true);

  const setNewsletterVisible = (visible: boolean) => {
    setIsNewsletterVisible(visible);
  };

  return (
    <NewsletterContext.Provider value={{ isNewsletterVisible, setNewsletterVisible }}>
      {children}
    </NewsletterContext.Provider>
  );
};
