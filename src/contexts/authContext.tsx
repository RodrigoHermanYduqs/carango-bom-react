import { createContext, useContext, useEffect, useState } from 'react';
import { Autenticacao } from '../types/autenticacao.type';
import { realizarLogin } from '../services/autenticacao.service';
import { getTokenAcesso, setTokenAcesso, removerTokenAcesso } from '../utils/tokenAcesso';
import { AuthContextProps } from '../interfaces/IAuthContextProps';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [idUsuario, setIdUsuario] = useState<string | null>(null);

  useEffect(() => {
    const tokenSalvo = getTokenAcesso()?.token || null;
    const idUsuarioSalvo = getTokenAcesso()?.id_usuario || null;
    if (tokenSalvo || idUsuarioSalvo) {
      setToken(tokenSalvo);
      setIdUsuario(idUsuario);
    }
  }, []);

  const login = async (dados: Autenticacao): Promise<boolean> => {
    try {
      
      const { token_acesso, id_usuario } = await realizarLogin(dados);
      if (token_acesso) {
        setTokenAcesso(token_acesso, id_usuario);
        setToken(token_acesso);
        setIdUsuario(idUsuario);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao logar:', error);
      return false;
    }
  };

  const logout = () => {
    removerTokenAcesso();
    setToken(null);
    setIdUsuario(null);
  };

  const estaAutenticado = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        estaAutenticado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
