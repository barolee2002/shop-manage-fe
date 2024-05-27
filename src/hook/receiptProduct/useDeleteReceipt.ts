import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_RECEIPT } from 'src/general/constants/endpoints';

const useDeleteReceipt = (id: number): [() => Promise<number>, boolean] => {
  const [isPendingDeleteReceipt, setIsPendingDeleteReceipt] = React.useState(false);
  const fetchApi = async (): Promise<number> => {
    setIsPendingDeleteReceipt(true);
    try {
      const res = await axiosClient.delete(ENDPOINTS_RECEIPT.DELETE.replace(':id', String(id)));
      setIsPendingDeleteReceipt(false);
      return res.data;
    } catch (err) {
      console.log(err);
      setIsPendingDeleteReceipt(false);
      throw err;
    }
  };
  return [fetchApi, isPendingDeleteReceipt];
};

export default useDeleteReceipt;
