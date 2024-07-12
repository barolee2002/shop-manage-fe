// import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { userLogin } from 'src/features/Auth/screens/SignInScreen/authenSlice';
import useGetInventory from 'src/hook/inventory/useGetInventory';
import { UserLogin } from 'src/types/user.type';

import { getCookie } from 'src/utils/Cookie';
interface PrivateRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getCookie('userInfo');
  const {getInventories} = useGetInventory()
  const isAuthenticated = user ? true : false;
  useEffect(() => {
    const userModel: UserLogin = JSON.parse(user);
    if (isAuthenticated) {
      dispatch(userLogin(userModel));
      getInventories(userModel?.storeId);
    }
    if (!userModel.isAuthentication) {
      navigate('/register/finish');
    }
  }, []);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PublicRoute;
