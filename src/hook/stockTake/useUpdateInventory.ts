import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { STOCK_TAKE_ENDPOINTS } from 'src/general/constants/endpoints';


const useUpdateInventory = (): [(id: number) => Promise<number>, boolean] => {
  const [isPendingUpdateInventory, setIsPendingUpdateInventory] = React.useState(false);
  const fetchApi = async (id: number): Promise<number> => {
    setIsPendingUpdateInventory(true);
    try {
      const res = await axiosClient.put<number>(STOCK_TAKE_ENDPOINTS.UPDATE_INVENTORY.replace(':id', String(id)));
      setIsPendingUpdateInventory(false);
      return res.data;
    } catch (err) {
      console.log(err);
      setIsPendingUpdateInventory(false);
      throw err;
    }
  };
  return [fetchApi, isPendingUpdateInventory];
};

export default useUpdateInventory;
