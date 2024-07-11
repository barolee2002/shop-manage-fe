import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { CUSTOMER_ENDPOINTS } from 'src/general/constants/endpoints';
import { TopCustomerType } from 'src/types/customer.type';

const useGetTopCustomerExpenditure = (
  id: number
): {
  topCustomerExpenditure: TopCustomerType[];
  isPendingTopCustomerExpenditure: boolean;
  reFetchTopCustomerExpenditure: ({ inventoryId, time }: { inventoryId: number; time: string }) => Promise<TopCustomerType[]>;
} => {
  const [topCustomerExpenditure, setTopCustomerExpenditure] = useState<TopCustomerType[]>([]);
  const [isPendingTopCustomerExpenditure, setIsPendingTopCustomerExpenditure] = useState<boolean>(false);
  const fetchApi = async ({
    inventoryId,
    time,
  }: {
    inventoryId: number;
    time?: string;
  }): Promise<TopCustomerType[]> => {
    setIsPendingTopCustomerExpenditure(true);
    try {
      const response = await axiosClient.get<TopCustomerType[]>(
        CUSTOMER_ENDPOINTS.GET_TOP_CUSTOMER_ECPENDITURE.replace(':storeId', id as unknown as string),
        {
          params: {
            storeId: id,
            inventoryId,
            time,
          },
        }
      );
      setIsPendingTopCustomerExpenditure(false);
      setTopCustomerExpenditure(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { topCustomerExpenditure, isPendingTopCustomerExpenditure, reFetchTopCustomerExpenditure: fetchApi };
};

export default useGetTopCustomerExpenditure;
