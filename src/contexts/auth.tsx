import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
// import { OneSignal } from 'react-native-onesignal';


import { IUser } from '@/hooks/fetchs/interfaces';
import { login } from '@/hooks/mutations';
import {
  AuthContextData,
  InfoInterface,
  LoginFormValues
} from '@/interfaces';

interface AuthProviderProps {
  children: ReactNode
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { reset } = useNavigation();
  const { mutateAsync } = login()

  const [user, setUser] = useState<Omit<IUser, "accessToken" | "errors" | "isValid"> | null>(null);
  const [loading, setLoading] = useState(false);
  const [isShowChangeAccount, setIsShowChangeAccount] = useState(false);
  const [route, setRoute] = useState(3);
  const [info, setInfo] = useState<InfoInterface | null>(null);
  const [signed, setSigned] = React.useState<boolean>(false);

  async function loadStorageData() {
    setLoading(true);
    const storageUser = await AsyncStorage.getItem('smart-boi@user');
    const storageToken = await AsyncStorage.getItem('smart-boi@token');

    if (storageUser && storageToken) {
      setUser(JSON.parse(storageUser));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
  useEffect(() => {

    loadStorageData();
  }, []);

  const signIn = React.useCallback(async (input: LoginFormValues) => {
    const data = await mutateAsync(input)

    await AsyncStorage.setItem('smart-boi@token', data.accessToken);
    const useruario = {
      usuarioId: data.usuarioId,
      nome: data.nome,
      email: data.email,
      enumNivel: data.enumNivel,
      fotoUrl: data.fotoUrl,
      tipoAcesso: data.tipoAcesso,
      fazendas: data.fazendas,
      urlVideoHome: data.urlVideoHome,
      telefone: data.telefone,
      cpf: data.cpf,
    }
    await AsyncStorage.setItem('smart-boi@user', JSON.stringify(useruario));
    setUser(useruario);
  }, [])

  function signOut() {
    setLoading(true);
    setIsShowChangeAccount(false);

    // OneSignal.User.removeTag('userId');
    const localAuth = AsyncStorage.getItem('smart-boi@local-auth').then(h =>
      h ? JSON.parse(h) : null,
    );
    AsyncStorage.clear().then(() => {
      setUser(null);
    });

    localAuth.then(async h => {
      await AsyncStorage.setItem('smart-boi@local-auth', JSON.stringify(h));
    });
    setLoading(false);
  }

  async function updateUser(objeto: Omit<IUser, "accessToken" | "errors" | "isValid">) {
    await AsyncStorage.setItem('smart-boi@user', JSON.stringify(objeto));
    setUser(objeto);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signed: !!user,
        updateUser,
        route,
        setRoute,
        user,
        setUser,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
