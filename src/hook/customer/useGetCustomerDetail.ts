import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { CUSTOMER_ENDPOINTS } from 'src/general/constants/endpoints';
import { CustomerType } from 'src/types/customer.type';

const useGetCustomerDetail = (
  id: number
): { customer: CustomerType; isPendingGetCustomer: boolean; reFetchGetCustomer: () => Promise<CustomerType> } => {
  const [customer, setCustomer] = useState<CustomerType>({} as CustomerType);
  const [isPendingGetCustomer, setIsPendingGetCustomer] = useState<boolean>(false);
  const fetchApi = async (): Promise<CustomerType> => {
    setIsPendingGetCustomer(true);
    try {
      const response = await axiosClient.get<CustomerType>(
        CUSTOMER_ENDPOINTS.GET_CUSTOMER_DETAIL.replace(':id', id as unknown as string)
      );
      setIsPendingGetCustomer(false);
      setCustomer(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchApi();
  }, [id]);
  return { customer, isPendingGetCustomer, reFetchGetCustomer: fetchApi };
};

export default useGetCustomerDetail;
