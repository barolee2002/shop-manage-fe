import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { RECEIPT_ENDPOINTS } from 'src/general/constants/endpoints';


const usePayReceipt = (id: number): [() => Promise<string>, boolean] => {
  const [isPendingPayReceipt, setIsPendingPayReceipt] = React.useState(false);
  const fetchApi = async (): Promise<string> => {
    setIsPendingPayReceipt(true);
    try {
      const res = await axiosClient.put<string>(RECEIPT_ENDPOINTS.PAY.replace(':id', String(id)));
      setIsPendingPayReceipt(false);
      return res.data;
    } catch (err) {
      console.log(err);
      setIsPendingPayReceipt(false);
      throw err;
    }
  };
  return [fetchApi, isPendingPayReceipt];
};

export default usePayReceipt;
