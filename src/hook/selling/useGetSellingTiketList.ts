import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_RECEIPT, SELLING_ENDPOINTS } from 'src/general/constants/endpoints';
import { FilterReceipt, ReceiptsList } from 'src/types/ReceiptType';

const useGetSellingTiketList = (
  id: number
): { getSellingTikets: (data: FilterReceipt) => Promise<ReceiptsList>; isPendingGetSellingTickets: boolean } => {
  const [isPendingGetSellingTickets, setIsPendingGetSellingTickets] = useState<boolean>(false);
  const fetchApi = async (data: FilterReceipt): Promise<ReceiptsList> => {
    setIsPendingGetSellingTickets(true);
    try {
      const response = await axiosClient.get<ReceiptsList>(
        SELLING_ENDPOINTS.GET_SELLING_TIKETS.replace(':storeId', String(id)),
        {
          params: {
            ...data,
          },
        }
      );
      setIsPendingGetSellingTickets(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { getSellingTikets: fetchApi, isPendingGetSellingTickets };
};

export default useGetSellingTiketList;
