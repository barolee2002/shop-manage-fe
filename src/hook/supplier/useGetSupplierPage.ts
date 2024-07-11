import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_SUPPLIER } from 'src/general/constants/endpoints';
import { metaData } from 'src/types/MetaData';
import { SupplierFilter, SupplierPage, SupplierType } from 'src/types/supplier.type';

const useGetSupplierPage = (
  storeId: number
): {
  supplierPage: SupplierType[];
  metadata: metaData;
  isPendingSupplierPage: boolean;
  reFetchSupplierPage: (filterForm: SupplierFilter) => Promise<SupplierPage>;
} => {
  const [supplierPage, setSupplierPage] = useState<SupplierType[]>([]);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const [isPendingSupplierPage, setIsPendingSupplierPage] = useState<boolean>(false);
  const fetchApi = async (filterForm: SupplierFilter): Promise<SupplierPage> => {
    setIsPendingSupplierPage(true);
    try {
      const response = await axiosClient.get<SupplierPage>(
        ENDPOINTS_SUPPLIER.GET_SUPPLIER_PAGE_ENDPOINT.replace(':storeId', storeId as unknown as string),
        {
          params: {...filterForm},
        }
      );
      setIsPendingSupplierPage(false);
      setSupplierPage(response.data.data);
      setMetadata(response.data.metaData);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { supplierPage, metadata, isPendingSupplierPage, reFetchSupplierPage: fetchApi };
};

export default useGetSupplierPage;
