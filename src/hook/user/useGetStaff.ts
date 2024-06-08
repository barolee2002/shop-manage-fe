import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINT_USER } from 'src/general/constants/endpoints';
import { UserType } from 'src/types/user.type';

const useGetUsers = (
  storeId: number
): { staffs: UserType[]; isPendingGetUsers: boolean; reFetchGetStaffs: () => Promise<UserType[]> } => {
  const [staffs, setStaffs] = useState<UserType[]>([]);
  const [isPendingGetUsers, setIsPendingGetUsers] = useState<boolean>(false);
  const fetchApi = async (): Promise<UserType[]> => {
    setIsPendingGetUsers(true);
    try {
      const response = await axiosClient.get<UserType[]>(
        ENDPOINT_USER.GET_USER_LIST_ENDPOINT.replace(':storeId', storeId as unknown as string)
      );
      setIsPendingGetUsers(false);
      setStaffs(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchApi();
  }, [storeId]);
  return { staffs, isPendingGetUsers, reFetchGetStaffs: fetchApi };
};

export default useGetUsers;
