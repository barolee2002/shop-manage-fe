import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_SUPPLIER } from 'src/general/constants/endpoints';
import { SupplierType } from 'src/types/supplier.type';

const useUpdateSupplier = (storeId: number): {
  updateSupplier: (data: SupplierType) => Promise<SupplierType>;
  isPendingUpdateSupplier: boolean;
} => {
  const [isPendingUpdateSupplier, setIsPendingUpdateSupplier] = useState<boolean>(false);
  const fetchApi = async (data: SupplierType): Promise<SupplierType> => {
    setIsPendingUpdateSupplier(true);
    try {
      const response = await axiosClient.put<SupplierType>(ENDPOINTS_SUPPLIER.UPDATE_SUPPLIER, {
        ...data,
        storeId
      });
      setIsPendingUpdateSupplier(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { updateSupplier: fetchApi, isPendingUpdateSupplier };
};

export default useUpdateSupplier;
