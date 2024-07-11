import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { STOCK_MANAGEMENT_ENDPOINTS } from 'src/general/constants/endpoints';
import { inventoryType } from 'src/types/inventory';

const useCreateInventory = (
  id: number
): {
  createInventory: (data: inventoryType) => Promise<inventoryType>;
  isPendingCreateInventory: boolean;
} => {
  const [isPendingCreateInventory, setIsPendingCreateInventory] = useState<boolean>(false);
  const fetchApi = async (data: inventoryType): Promise<inventoryType> => {
    setIsPendingCreateInventory(true);
    try {
      const response = await axiosClient.post<inventoryType>(
        STOCK_MANAGEMENT_ENDPOINTS.CREATE_STOCK.replace(':storeId', String(id)),
        {
          ...data,
        }
      );
      setIsPendingCreateInventory(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { createInventory: fetchApi, isPendingCreateInventory };
};

export default useCreateInventory;
