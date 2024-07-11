import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { STOCK_TAKE_ENDPOINTS } from 'src/general/constants/endpoints';


const useDeleteStockTake = (): [(id: number) => Promise<number>, boolean] => {
  const [isPendingDeleteStockTake, setIsPendingDeleteStockTake] = React.useState(false);
  const fetchApi = async (id: number): Promise<number> => {
    setIsPendingDeleteStockTake(true);
    try {
      const res = await axiosClient.delete<number>(STOCK_TAKE_ENDPOINTS.DELETE.replace(':id', String(id)));
      setIsPendingDeleteStockTake(false);
      return res.data;
    } catch (err) {
      console.log(err);
      setIsPendingDeleteStockTake(false);
      throw err;
    }
  };
  return [fetchApi, isPendingDeleteStockTake];
};

export default useDeleteStockTake;
