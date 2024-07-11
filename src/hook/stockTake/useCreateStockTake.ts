import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { STOCK_TAKE_ENDPOINTS } from 'src/general/constants/endpoints';
import { StockTakeType } from 'src/types/stokeTakeTypes';

const useCreateStockTake = (): [(data: StockTakeType) => Promise<StockTakeType>, boolean] => {
  const [isPendingCreateStockTake, setIsPendingCreateStockTake] = useState<boolean>(false);
  const fetchApi = async (data: StockTakeType): Promise<StockTakeType> => {
    setIsPendingCreateStockTake(true);
    try {
      const response = await axiosClient.post<StockTakeType>(STOCK_TAKE_ENDPOINTS.CREATE_RECEIPT_ENDPOINT, {
        ...data,
      });
      setIsPendingCreateStockTake(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return [fetchApi, isPendingCreateStockTake];
};

export default useCreateStockTake;
