// Multi-currency support utility

export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number; // Conversion rate from USD
  stripe_currency: string; // Stripe currency code (lowercase)
}

// Currency definitions based on user requirements
export const SUPPORTED_CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, stripe_currency: 'usd' },
  SGD: { code: 'SGD', symbol: 'S$', rate: 1.34, stripe_currency: 'sgd' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, stripe_currency: 'gbp' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.52, stripe_currency: 'aud' },
  AED: { code: 'AED', symbol: 'AED', rate: 3.67, stripe_currency: 'aed' },
  HKD: { code: 'HKD', symbol: 'HK$', rate: 7.83, stripe_currency: 'hkd' },
  CNY: { code: 'CNY', symbol: '¥', rate: 7.24, stripe_currency: 'cny' },
};

// Country to currency mapping
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD',
  SG: 'SGD',
  GB: 'GBP',
  AU: 'AUD',
  AE: 'AED',
  HK: 'HKD',
  CN: 'CNY',
  // Default to USD for other countries
};

/**
 * Detect user's currency based on their location
 * Uses a free IP geolocation service
 */
export const detectUserCurrency = async (): Promise<CurrencyInfo> => {
  try {
    // Try to detect from IP geolocation
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    const countryCode = data.country_code;
    const currencyCode = COUNTRY_TO_CURRENCY[countryCode] || 'USD';

    return SUPPORTED_CURRENCIES[currencyCode];
  } catch (error) {
    console.log('Currency detection failed, defaulting to USD', error);
    return SUPPORTED_CURRENCIES.USD;
  }
};

/**
 * Convert USD price to target currency
 */
export const convertPrice = (usdPrice: number, targetCurrency: CurrencyInfo): number => {
  const converted = usdPrice * targetCurrency.rate;
  // Round to 2 decimal places for most currencies, whole numbers for JPY, KRW etc
  return Math.round(converted * 100) / 100;
};

/**
 * Format price with currency symbol
 */
export const formatPrice = (price: number, currency: CurrencyInfo): string => {
  // Format based on currency
  const formatted = price.toFixed(currency.code === 'JPY' ? 0 : 2);

  // Symbol position (before or after)
  if (currency.code === 'USD' || currency.code === 'GBP' || currency.code === 'AUD' || currency.code === 'SGD' || currency.code === 'HKD' || currency.code === 'CNY') {
    return `${currency.symbol}${formatted}`;
  }

  return `${formatted} ${currency.symbol}`;
};

/**
 * Get full price display string
 */
export const getPriceDisplay = (usdPrice: number, currency: CurrencyInfo): string => {
  const convertedPrice = convertPrice(usdPrice, currency);
  return `${formatPrice(convertedPrice, currency)} ${currency.code}`;
};
