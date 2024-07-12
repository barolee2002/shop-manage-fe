import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINT_USER } from 'src/general/constants/endpoints';

const useDeleteStaff = (): { deleteStaff: (id: number) => Promise<number>; isPendingDeleteStaff: boolean } => {
  const [isPendingDeleteStaff, setIsPendingDeleteStaff] = useState<boolean>(false);
  const deleteStaff = async (id: number): Promise<number> => {
    setIsPendingDeleteStaff(true);
    try {
      const response = await axiosClient.put<number>(
        ENDPOINT_USER.DELETE.replace(':id', id as unknown as string)
      );
      setIsPendingDeleteStaff(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { deleteStaff, isPendingDeleteStaff };
};

export default useDeleteStaff;
