import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { CUSTOMER_ENDPOINTS } from 'src/general/constants/endpoints';
import { metaData } from 'src/types/MetaData';
import { CustomerList, CustomerType } from 'src/types/customer.type';

const useGetCustomersList = (
  storeId: number
): {
  customers: CustomerType[];
  isPendingGetCustomers: boolean;
  reFetchGetCustomers: () => Promise<CustomerType[]>;
} => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const [isPendingGetCustomers, setIsPendingGetCustomers] = useState<boolean>(false);
  const fetchApi = async (): Promise<CustomerType[]> => {
    setIsPendingGetCustomers(true);
    try {
      const response = await axiosClient.get<CustomerType[]>(
        CUSTOMER_ENDPOINTS.GET_CUSTOMERS_lIST.replace(':storeId', storeId as unknown as string),
      );
      setIsPendingGetCustomers(false);
      setCustomers(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { customers, isPendingGetCustomers, reFetchGetCustomers: fetchApi };
};

export default useGetCustomersList;
