import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { RECEIPT_ENDPOINTS } from 'src/general/constants/endpoints';
import { ReceiptsType } from 'src/types/ReceiptType';


const useCreateReceipt = (): [(data: ReceiptsType) => Promise<ReceiptsType>, boolean] => {
  const [isPendingCreateReceipt, setIsPendingCreateReceipt] = React.useState(false);
  const fetchApi = async (data: ReceiptsType): Promise<ReceiptsType> => {
    setIsPendingCreateReceipt(true);
    try {
      const res = await axiosClient.post<ReceiptsType>(RECEIPT_ENDPOINTS.CREATE_RECEIPT_ENDPOINT, { ...data });
      setIsPendingCreateReceipt(false);
      return res.data;
    } catch (err) {
      console.log(err);
      setIsPendingCreateReceipt(false);
      throw err;
    }
  };
  return [fetchApi, isPendingCreateReceipt];
};

export default useCreateReceipt;
