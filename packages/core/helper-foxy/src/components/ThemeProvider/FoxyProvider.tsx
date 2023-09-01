import { createContext } from '../helpers/context';
import { ThemeProvider, ThemeProviderProps } from './ThemeProvider';

const DEFAULT_LOCALE = 'en-EN';

const getDefaultLocale = () => {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }

  if (navigator.language) {
    return navigator.language;
  }

  return DEFAULT_LOCALE;
};

interface FoxyContextValue {
  locale: string;
}

const [Provider, useFoxyContextValue] = createContext<FoxyContextValue>('StrapiFoxyContextValue', {
  locale: getDefaultLocale(),
});

interface FoxyContextValueProviderProps extends ThemeProviderProps, Partial<FoxyContextValue> { }

const FoxyProvider = ({ locale = getDefaultLocale(), ...restProps }: FoxyContextValueProviderProps) => {
  return (
    <Provider locale={locale}>
      <ThemeProvider {...restProps} />
    </Provider>
  );
};

export { useFoxyContextValue, FoxyProvider };
export type { FoxyContextValueProviderProps, FoxyContextValue };
