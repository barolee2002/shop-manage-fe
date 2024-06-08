import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_STOCK_TAKE } from 'src/general/constants/endpoints';


const useDeleteStockTake = (): [(id: number) => Promise<number>, boolean] => {
  const [isPendingDeleteStockTake, setIsPendingDeleteStockTake] = React.useState(false);
  const fetchApi = async (id: number): Promise<number> => {
    setIsPendingDeleteStockTake(true);
    try {
      const res = await axiosClient.delete<number>(ENDPOINTS_STOCK_TAKE.DELETE.replace(':id', String(id)));
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
