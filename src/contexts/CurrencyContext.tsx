import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyInfo, SUPPORTED_CURRENCIES, detectUserCurrency } from '../utils/currency';

interface CurrencyContextType {
  currency: CurrencyInfo;
  setCurrency: (currency: CurrencyInfo) => void;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyInfo>(SUPPORTED_CURRENCIES.USD);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect user's currency on mount
    const initCurrency = async () => {
      try {
        const detectedCurrency = await detectUserCurrency();
        setCurrency(detectedCurrency);
      } catch (error) {
        console.error('Failed to detect currency:', error);
        // Keep USD as default
      } finally {
        setIsLoading(false);
      }
    };

    initCurrency();
  }, []);

  const value = {
    currency,
    setCurrency,
    isLoading,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
