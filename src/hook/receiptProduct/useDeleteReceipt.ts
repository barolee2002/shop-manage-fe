import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { RECEIPT_ENDPOINTS } from 'src/general/constants/endpoints';
import { FilterReceipt, ReceiptsList } from 'src/types/ReceiptType';

const useDeleteReceipt = (): [(id: number) => Promise<number>, boolean] => {
  const [isPendingDeleteReceiptProductList, setIsPendingDeleteReceiptProductList] = useState<boolean>(false);
  const fetchApi = async (id: number): Promise<number> => {
    setIsPendingDeleteReceiptProductList(true);
    try {
      const response = await axiosClient.delete<number>(RECEIPT_ENDPOINTS.DELETE.replace(':id', String(id)));
      setIsPendingDeleteReceiptProductList(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return [fetchApi, isPendingDeleteReceiptProductList];
};

export default useDeleteReceipt;
