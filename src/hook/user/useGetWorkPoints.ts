import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINT_USER } from 'src/general/constants/endpoints';

const useGetWorkPoints = (
  id: number
): {
  fileWorkPoints: Blob | null;
  isPendingGetFileWorkPoints: boolean;
  reFetchGetFileWorkPoints: (time: string) => Promise<Blob>;
} => {
  const [fileWorkPoints, setFileWorkPoints] = useState<Blob | null>(null);
  const [isPendingGetFileWorkPoints, setIsPendingGetFileWorkPoints] = useState<boolean>(false);
  const fetchApi = async (time: string): Promise<Blob> => {
    setIsPendingGetFileWorkPoints(true);
    try {
      const response = await axiosClient.get<Blob>(ENDPOINT_USER.GET_WORK_POINTS, {
        params: {
          storeId: id,
          time: time,
        },
      });
      setIsPendingGetFileWorkPoints(false);
      setFileWorkPoints(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { fileWorkPoints, isPendingGetFileWorkPoints, reFetchGetFileWorkPoints: fetchApi };
};

export default useGetWorkPoints;
