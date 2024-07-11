import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_SUPPLIER } from 'src/general/constants/endpoints';
import { SupplierType } from 'src/types/supplier.type';

const useCreateSupplier = (storeId: number): {
  createSupplier: (data: SupplierType) => Promise<SupplierType>;
  isPendingCreateSupplier: boolean;
} => {
  const [isPendingCreateSupplier, setIsPendingCreateSupplier] = useState<boolean>(false);
  const fetchApi = async (data: SupplierType): Promise<SupplierType> => {
    setIsPendingCreateSupplier(true);
    try {
      const response = await axiosClient.post<SupplierType>(ENDPOINTS_SUPPLIER.CREATE_SUPPLIER, {
        ...data,
        storeId
      });
      setIsPendingCreateSupplier(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { createSupplier: fetchApi, isPendingCreateSupplier };
};

export default useCreateSupplier;
