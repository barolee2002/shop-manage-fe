import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_STOCK_TAKE } from 'src/general/constants/endpoints';
import { StockTakeType } from 'src/types/stokeTakeTypes';

const useCreateStockTake = (): [(data: StockTakeType) => Promise<StockTakeType>, boolean] => {
  const [isPendingCreateStockTake, setIsPendingCreateStockTake] = useState<boolean>(false);
  const fetchApi = async (data: StockTakeType): Promise<StockTakeType> => {
    setIsPendingCreateStockTake(true);
    try {
      const response = await axiosClient.post<StockTakeType>(ENDPOINTS_STOCK_TAKE.CREATE_RECEIPT_ENDPOINT, {
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
