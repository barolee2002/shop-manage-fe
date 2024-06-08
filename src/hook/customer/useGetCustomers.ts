import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { CUSTOMER_ENDPOINTS } from 'src/general/constants/endpoints';
import { metaData } from 'src/types/MetaData';
import { CustomerList, CustomerType } from 'src/types/customer.type';

const useGetCustomers = (
  storeId: number
): {
  customers: CustomerType[];
  metadata: metaData;
  isPendingGetCustomers: boolean;
  reFetchGetCustomers: ({ searchString }: { searchString: string }) => Promise<CustomerList>;
} => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const [isPendingGetCustomers, setIsPendingGetCustomers] = useState<boolean>(false);
  const fetchApi = async ({ searchString }: { searchString: string }): Promise<CustomerList> => {
    setIsPendingGetCustomers(true);
    try {
      const response = await axiosClient.get<CustomerList>(
        CUSTOMER_ENDPOINTS.GET_CUSTOMERS.replace(':storeId', storeId as unknown as string),
        {
          params: { searchString },
        }
      );
      setIsPendingGetCustomers(false);
      setCustomers(response.data.data);
      setMetadata(response.data.metaData);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { customers, metadata, isPendingGetCustomers, reFetchGetCustomers: fetchApi };
};

export default useGetCustomers;
