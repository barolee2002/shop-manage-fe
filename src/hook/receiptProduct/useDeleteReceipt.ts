import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { RECEIPT_ENDPOINTS } from 'src/general/constants/endpoints';
import { FilterReceipt, ReceiptsList } from 'src/types/ReceiptType';

const useGetReceiptProductList = (): [(data: FilterReceipt) => Promise<ReceiptsList>, boolean] => {
  const [isPendingGetReceiptProductList, setIsPendingGetReceiptProductList] = useState<boolean>(false);
  const fetchApi = async (data: FilterReceipt): Promise<ReceiptsList> => {
    setIsPendingGetReceiptProductList(true);
    try {
      const response = await axiosClient.get<ReceiptsList>(RECEIPT_ENDPOINTS.GET_RECEIPT_LIST_ENDPOINT, {
        params: {
          ...data,
        },
      });
      setIsPendingGetReceiptProductList(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return [fetchApi, isPendingGetReceiptProductList];
};

export default useGetReceiptProductList;
