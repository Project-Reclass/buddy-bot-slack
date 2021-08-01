import React, { createContext, useState, FC, useContext } from 'react';
import { useEffect } from 'react';
import { getUserData } from '../common/api/login';
import { useLocalStorage } from '../common/utils';

interface LoginState {
  isLoggedIn: boolean;
  username: string;
  avatarUrl: string;
  accessToken: string;
}

interface State extends LoginState {
  setValues: React.Dispatch<React.SetStateAction<State>>;
  setAccessToken: (token: string) => any;
}

const defaultState: State = {
  isLoggedIn: false,
  username: '',
  avatarUrl: '',
  accessToken: '',

  setValues: () => null,
  setAccessToken: () => null,
}

const AuthContext = createContext(defaultState);
const AuthProvider: FC = ({ children }) => {
  const [values, setValues] = useState(defaultState);
  const [token, setToken] = useLocalStorage('oauth-token');

  useEffect(() => {
    if (token) {
      setValues(prevValues => ({
        ...prevValues,
        accessToken: token,
      }));
    }
  }, [token]);

  const setAccessToken = (token: string) => {
    setToken(token);
  }

  useEffect(() => {
    if (values.isLoggedIn && values.accessToken) {
      (async() => {
        const res = await getUserData(values.accessToken);
        setValues(prevValues => ({
          ...prevValues,
          avatarUrl: res.avatar_url,
          username: res.login,
        }));
      })()
    }
  }, [values.accessToken, values.isLoggedIn])

  return (
    <AuthContext.Provider value={{ ...values, setValues, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
