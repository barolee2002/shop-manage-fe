import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import {  STOCK_TAKE_ENDPOINTS } from 'src/general/constants/endpoints';
import { FilterStockTakeType, StockTakeList } from 'src/types/stokeTakeTypes';

const useGetStockTakeList = (): [
  (data: FilterStockTakeType) => Promise<StockTakeList>,
  boolean,
] => {
  const [isPendingGetStockTakeList, setIsPendingGetStockTakeList] = useState<boolean>(false);
  const fetchApi = async (data: FilterStockTakeType): Promise<StockTakeList> => {
    setIsPendingGetStockTakeList(true);
    try {
      const response = await axiosClient.get<StockTakeList>(STOCK_TAKE_ENDPOINTS.GET_STOCK_TAKE_LIST_ENDPOINT, {
        params: {
          ...data,
        },
      });
      setIsPendingGetStockTakeList(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return [fetchApi, isPendingGetStockTakeList];
};

export default useGetStockTakeList;
