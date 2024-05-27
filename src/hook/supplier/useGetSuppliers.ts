import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_SUPPLIER } from 'src/general/constants/endpoints';
import { SupplierType } from 'src/types/supplier.type';

const useGetSuppliers = (storeId: number): [SupplierType[], boolean] => {
  const [isPendingGetSuppliers, setIsPendingGetSuppliers] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
  const fetchApi = async () => {
    setIsPendingGetSuppliers(true);
    try {
      const response = await axiosClient.get<SupplierType[]>(
        ENDPOINTS_SUPPLIER.GET_SUPPLIER_LIST_ENDPOINT.replace(':storeId', storeId as unknown as string)
      );
      setIsPendingGetSuppliers(false);
      setSuppliers(response.data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchApi();
  }, [storeId]);
  return [suppliers, isPendingGetSuppliers];
};

export default useGetSuppliers;
