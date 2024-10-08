import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { RECEIPT_ENDPOINTS } from 'src/general/constants/endpoints';


const useInventoryInReceipt = (id: number): [() => Promise<string>, boolean] => {
  const [isPendingInventoryInReceipt, setIsPendingInventoryInReceipt] = React.useState(false);
  const fetchApi = async (): Promise<string> => {
    setIsPendingInventoryInReceipt(true);
    try {
      const res = await axiosClient.put<string>(RECEIPT_ENDPOINTS.INVENTORY_IN.replace(':id', String(id)));
      setIsPendingInventoryInReceipt(false);
      return res.data;
    } catch (err) {
      console.log(err);
      setIsPendingInventoryInReceipt(false);
      throw err;
    }
  };
  return [fetchApi, isPendingInventoryInReceipt];
};

export default useInventoryInReceipt;
