import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { SELLING_ENDPOINTS } from 'src/general/constants/endpoints';
import { OrderFilter, SellingList } from 'src/types/selling.type';

const useGetSellingTiketList = (
  id: number
): { getSellingTikets: (data: OrderFilter) => Promise<SellingList>; isPendingGetSellingTickets: boolean } => {
  const [isPendingGetSellingTickets, setIsPendingGetSellingTickets] = useState<boolean>(false);
  const fetchApi = async (data: OrderFilter): Promise<SellingList> => {
    setIsPendingGetSellingTickets(true);
    try {
      const response = await axiosClient.get<SellingList>(
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
