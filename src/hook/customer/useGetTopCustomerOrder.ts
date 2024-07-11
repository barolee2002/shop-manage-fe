import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { CUSTOMER_ENDPOINTS } from 'src/general/constants/endpoints';
import { TopCustomerType } from 'src/types/customer.type';

const useGetTopCustomerOrder = (
  id: number
): {
  topCustomerOrder: TopCustomerType[];
  isPendingTopCustomerOrder: boolean;
  reFetchTopCustomerOrder: ({ inventoryId, time }: { inventoryId: number; time: string }) => Promise<TopCustomerType[]>;
} => {
  const [topCustomerOrder, setTopCustomerOrder] = useState<TopCustomerType[]>([]);
  const [isPendingTopCustomerOrder, setIsPendingTopCustomerOrder] = useState<boolean>(false);
  const fetchApi = async ({
    inventoryId,
    time,
  }: {
    inventoryId: number;
    time?: string;
  }): Promise<TopCustomerType[]> => {
    setIsPendingTopCustomerOrder(true);
    try {
      const response = await axiosClient.get<TopCustomerType[]>(
        CUSTOMER_ENDPOINTS.GET_TOP_CUSTOMER_ORDER.replace(':storeId', id as unknown as string),
        {
          params: {
            storeId: id,
            inventoryId,
            time,
          },
        }
      );
      setIsPendingTopCustomerOrder(false);
      setTopCustomerOrder(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { topCustomerOrder, isPendingTopCustomerOrder, reFetchTopCustomerOrder: fetchApi };
};

export default useGetTopCustomerOrder;
