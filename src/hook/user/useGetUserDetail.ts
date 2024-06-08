import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINT_USER } from 'src/general/constants/endpoints';
import { UserType } from 'src/types/user.type';

const useGetUserDetail = (
  id: number
): { user: UserType; isPendingGetUser: boolean; reFetchGetUser: () => Promise<UserType> } => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [isPendingGetUser, setIsPendingGetUser] = useState<boolean>(false);
  const fetchApi = async (): Promise<UserType> => {
    setIsPendingGetUser(true);
    try {
      const response = await axiosClient.get<UserType>(
        ENDPOINT_USER.GET_DETAIL.replace(':id', id as unknown as string)
      );
      setIsPendingGetUser(false);
      setUser(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchApi();
  }, [id]);
  return { user, isPendingGetUser, reFetchGetUser: fetchApi };
};

export default useGetUserDetail;
