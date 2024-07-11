import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { STOCK_MANAGEMENT_ENDPOINTS } from 'src/general/constants/endpoints';
import { StockManagementFilter, StockManagementList } from 'src/types/stokeManagement.type';

const useGetStockManagement = (): {
  getStockManagement: (data: StockManagementFilter) => Promise<StockManagementList>;
  isPendingGetStockManagement: boolean;
} => {
  const [isPendingGetStockManagement, setIsPendingGetStockManagement] = useState<boolean>(false);
  const fetchApi = async (data: StockManagementFilter): Promise<StockManagementList> => {
    setIsPendingGetStockManagement(true);
    try {
      const response = await axiosClient.get<StockManagementList>(STOCK_MANAGEMENT_ENDPOINTS.STOCK_MANAGEMENT, {
        params: {
          ...data,
        },
      });
      setIsPendingGetStockManagement(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { getStockManagement: fetchApi, isPendingGetStockManagement };
};

export default useGetStockManagement;
