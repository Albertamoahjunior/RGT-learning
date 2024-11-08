import { createContext } from 'react';
import { AuthContextType } from './types';

const defaultContext: AuthContextType = {
  token: undefined,
  updateToken: () => {}, // No-op function as placeholder
};

export const AuthContext = createContext< AuthContextType >(defaultContext);
