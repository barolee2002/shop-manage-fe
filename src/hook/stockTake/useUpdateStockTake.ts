import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { STOCK_TAKE_ENDPOINTS } from 'src/general/constants/endpoints';
import { StockTakeType } from 'src/types/stokeTakeTypes';

const useUpdateStockTake = (): [(data: StockTakeType) => Promise<StockTakeType>, boolean] => {
  const [isPendingUpdateStockTake, setIsPendingUpdateStockTake] = useState<boolean>(false);
  const fetchApi = async (data: StockTakeType): Promise<StockTakeType> => {
    setIsPendingUpdateStockTake(true);
    try {
      const response = await axiosClient.put<StockTakeType>(STOCK_TAKE_ENDPOINTS.UPDATE, {
        ...data,
      });
      setIsPendingUpdateStockTake(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return [fetchApi, isPendingUpdateStockTake];
};

export default useUpdateStockTake;
