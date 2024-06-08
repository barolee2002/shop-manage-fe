import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINT_USER } from 'src/general/constants/endpoints';
import { metaData } from 'src/types/MetaData';
import { UserPageType, UserType } from 'src/types/user.type';

const useGetUserPage = (
  storeId: number
): {
  staffs: UserType[];
  metadata: metaData;
  isPendingGetUsers: boolean;
  reFetchGetStaffs: (searchString: string, role: string, page: number, pageSize: number) => Promise<UserPageType>;
} => {
  const [staffs, setStaffs] = useState<UserType[]>([]);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const [isPendingGetUsers, setIsPendingGetUsers] = useState<boolean>(false);
  const fetchApi = async (
    searchString: string,
    role: string,
    page: number,
    pageSize: number
  ): Promise<UserPageType> => {
    setIsPendingGetUsers(true);
    try {
      const response = await axiosClient.get<UserPageType>(
        ENDPOINT_USER.GET_USER_PAGE.replace(':storeId', storeId as unknown as string),
        {
          params: { searchString, role, page, pageSize },
        }
      );
      setIsPendingGetUsers(false);
      setStaffs(response.data.data);
      setMetadata(response.data.metaData);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { staffs, metadata, isPendingGetUsers, reFetchGetStaffs: fetchApi };
};

export default useGetUserPage;
