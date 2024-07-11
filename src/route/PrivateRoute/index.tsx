// import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { userLogin } from 'src/features/Auth/screens/SignInScreen/authenSlice';
import useGetInventory from 'src/hook/inventory/useGetInventory';
import { UserLogin } from 'src/types/user.type';

import { getCookie } from 'src/utils/Cookie';
interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const dispatch = useDispatch();
  const user = getCookie('userInfo');
  const {getInventories} = useGetInventory()
  const isAuthenticated = user ? true : false;
  if (isAuthenticated) {
    const userModel: UserLogin = JSON.parse(user);
    dispatch(userLogin(userModel));
    getInventories(userModel?.storeId);
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
