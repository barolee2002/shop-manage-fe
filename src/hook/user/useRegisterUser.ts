import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_STOCK_TAKE, ENDPOINT_USER } from 'src/general/constants/endpoints';
import { UserType } from 'src/types/user.type';

const useCreateUser = (): {
  createAdmin: (data: UserType) => Promise<UserType>;
  createStaff: (data: UserType) => Promise<UserType>;
  isPendingCreateUser: boolean;
} => {
  const [isPendingCreateUser, setIsPendingCreateUser] = useState<boolean>(false);
  const createAdmin = async (data: UserType): Promise<UserType> => {
    setIsPendingCreateUser(true);
    try {
      const response = await axiosClient.post<UserType>(ENDPOINT_USER.CREATE_USER, {
        ...data,
      });
      setIsPendingCreateUser(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const createStaff = async (data: UserType): Promise<UserType> => {
    setIsPendingCreateUser(true);
    try {
      const response = await axiosClient.post<UserType>(ENDPOINT_USER.CREATE_STAFF, {
        ...data,
      });
      setIsPendingCreateUser(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  return { createAdmin, createStaff, isPendingCreateUser };
};

export default useCreateUser;
