import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { AUTH_ENDPOINTS } from 'src/general/constants/endpoints';
import { LoginType } from 'src/types/auth.type';
import { UserLogin, UserType } from 'src/types/user.type';

const useAuth = (): {
  login: (data: LoginType) => Promise<UserLogin>;
  isPendingLogin: boolean;
  logout: () => Promise<number>;
} => {
  const [isPendingLogin, setIsPendingLogin] = React.useState(false);
  const login = async (data: LoginType): Promise<UserLogin> => {
    setIsPendingLogin(true);
    try {
      const res = await axiosClient.post<UserLogin>(AUTH_ENDPOINTS.LOGIN_ENDPOINT, { ...data });
      setIsPendingLogin(false);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const logout = async (): Promise<number> => {
    try {
      const res = await axiosClient.post<number>(AUTH_ENDPOINTS.LOGOUT_ENDPOINT);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { login, isPendingLogin, logout };
};

export default useAuth;
