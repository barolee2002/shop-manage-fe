import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_SUPPLIER } from 'src/general/constants/endpoints';
import { SupplierType } from 'src/types/supplier.type';

const useDeleteSupplier = (): { deleteSupplier: (id: number) => Promise<number>; isDeleteSupplier: boolean } => {
  const [isDeleteSupplier, setIsPendingDeleteSupplier] = useState<boolean>(false);
  const deleteSupplier = async (supplierId: number): Promise<number> => {
    setIsPendingDeleteSupplier(true);
    try {
      const response = await axiosClient.put<number>(
        ENDPOINTS_SUPPLIER.DELETE_SUPPLIER.replace(':id', supplierId as unknown as string)
      );
      setIsPendingDeleteSupplier(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { deleteSupplier, isDeleteSupplier };
};

export default useDeleteSupplier;
