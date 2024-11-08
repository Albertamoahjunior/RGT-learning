export interface Token{

}

export interface ThemeContextType{
  theme: string;
  changeTheme: () => void;
}

export interface AuthContextType{
  token: Token | undefined;
  updateToken: (token: Token) => void;
}
