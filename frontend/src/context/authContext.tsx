import { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface AuthContextType {
  token: string;
  user_id: string;
  username: string;
}

interface AuthContextValue {
  authParcel: AuthContextType;
  setAuthParcel: React.Dispatch<React.SetStateAction<AuthContextType>>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Default values for authentication
const defaultAuth: AuthContextType = {
  token: '',
  user_id: '0',
  username: 'guest',
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Explicitly typing the state
  const [authParcel, setAuthParcel] = useState<AuthContextType>(defaultAuth);

  return (
    <AuthContext.Provider value={{ authParcel, setAuthParcel }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context; // Return only the authParcel value
};
