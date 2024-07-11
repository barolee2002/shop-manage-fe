import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { STOCK_TAKE_ENDPOINTS } from 'src/general/constants/endpoints';
import { StockTakeType } from 'src/types/stokeTakeTypes';

const useGetStockTakeDetail = (id: string): [data: StockTakeType, pending: boolean, fetchData: () => Promise<StockTakeType>] => {
  const [isPendingGetStockTakeDetail, setIsPendingGetStockTakeDetail] = useState<boolean>(false);
  const [stockTake, setStockTake] = useState<StockTakeType>({} as StockTakeType);
  const fetchApi = async (): Promise<StockTakeType> => {
    setIsPendingGetStockTakeDetail(true);
    try {
      const response = await axiosClient.get<StockTakeType>(STOCK_TAKE_ENDPOINTS.STOCK_TAKE_DETAIL.replace(':id', id));
      setStockTake(response.data);
      setIsPendingGetStockTakeDetail(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchApi();
  },[])
  return [stockTake, isPendingGetStockTakeDetail, fetchApi];
};

export default useGetStockTakeDetail;
