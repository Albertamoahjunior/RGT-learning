import { createContext } from 'react';
import { ThemeContextType } from './types';

const defaultContext: ThemeContextType = {
  theme: 'light',
  changeTheme: () => {}, // No-op function as placeholder
};

export const ThemeContext = createContext< ThemeContextType >(defaultContext);
