import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { CUSTOMER_ENDPOINTS } from 'src/general/constants/endpoints';
import { CustomerType } from 'src/types/customer.type';

const useCreateCustomer = (
  storeId: number
): {
  createCustomers: (data: CustomerType) => Promise<CustomerType>;
  isPendingCreateCustomers: boolean;
} => {
  const [isPendingCreateCustomers, setIsPendingCreateCustomers] = useState<boolean>(false);
  const fetchApi = async (data: CustomerType): Promise<CustomerType> => {
    setIsPendingCreateCustomers(true);
    try {
      const response = await axiosClient.post<CustomerType>(CUSTOMER_ENDPOINTS.CREATE_CUSTOMER, {
        ...data,
      });
      setIsPendingCreateCustomers(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { createCustomers: fetchApi, isPendingCreateCustomers };
};

export default useCreateCustomer;
