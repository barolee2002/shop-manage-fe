import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINT_USER } from 'src/general/constants/endpoints';
import { UserType } from 'src/types/user.type';

const useUpdateUser = (): {
  updateUserInfo: (id: number, data: UserType) => Promise<UserType>;
  isPendingUpdateUserInfo: boolean;
} => {
  const [isPendingUpdateUserInfo, setIsPendingUpdateUserInfo] = React.useState(false);
  const fetchApi = async (id: number, data: UserType): Promise<UserType> => {
    setIsPendingUpdateUserInfo(true);
    try {
      const res = await axiosClient.put<UserType>(ENDPOINT_USER.UPDATE_USER.replace(':id', String(id)), { ...data });
      setIsPendingUpdateUserInfo(false);
      return res.data;
    } catch (err) {
      console.log(err);
      setIsPendingUpdateUserInfo(false);
      throw err;
    }
  };
  return { updateUserInfo: fetchApi, isPendingUpdateUserInfo };
};

export default useUpdateUser;
