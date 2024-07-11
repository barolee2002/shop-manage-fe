import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { SELLING_ENDPOINTS } from 'src/general/constants/endpoints';
import { SellingList } from 'src/types/selling.type';

const useGetSellingsByCustomer = (
  id: number
): { getSellingsByCustomer: () => Promise<SellingList>; isPendingGetSellingsByCustomer: boolean } => {
  const [isPendingGetSellingsByCustomer, setIsPendingGetSellingsByCustomer] = useState<boolean>(false);
  const fetchApi = async (): Promise<SellingList> => {
    setIsPendingGetSellingsByCustomer(true);
    try {
      const response = await axiosClient.get<SellingList>(
        SELLING_ENDPOINTS.GET_SELLING_CUSTOMER.replace(':customerId', String(id))
      );
      setIsPendingGetSellingsByCustomer(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { getSellingsByCustomer: fetchApi, isPendingGetSellingsByCustomer };
};

export default useGetSellingsByCustomer;