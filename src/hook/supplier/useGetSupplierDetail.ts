import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_SUPPLIER } from 'src/general/constants/endpoints';
import { SupplierType } from 'src/types/supplier.type';

const useGetSupplierDetail = (
  id: number
): { supplier: SupplierType; isPendingGetSupplier: boolean; reFetchGetSupplier: () => Promise<SupplierType> } => {
  const [supplier, setSupplier] = useState<SupplierType>({} as SupplierType);
  const [isPendingGetSupplier, setIsPendingGetSupplier] = useState<boolean>(false);
  const fetchApi = async (): Promise<SupplierType> => {
    setIsPendingGetSupplier(true);
    try {
      const response = await axiosClient.get<SupplierType>(
        ENDPOINTS_SUPPLIER.GET_SUPPLIER_DETAIL.replace(':id', id as unknown as string)
      );
      setIsPendingGetSupplier(false);
      setSupplier(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchApi();
  }, [id]);
  return { supplier, isPendingGetSupplier, reFetchGetSupplier: fetchApi };
};

export default useGetSupplierDetail;
