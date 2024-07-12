import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_PRODUCT } from 'src/general/constants/endpoints';

const useDeleteProduct = (): { deleteProduct: (id: number) => Promise<number>; isPendingDeleteProduct: boolean } => {
  const [isPendingDeleteProduct, setIsPendingDeleteproduct] = useState<boolean>(false);
  const deleteProduct = async (id: number): Promise<number> => {
    setIsPendingDeleteproduct(true);
    try {
      const response = await axiosClient.delete<number>(ENDPOINTS_PRODUCT.DELETE.replace(':id', id as unknown as string));
      setIsPendingDeleteproduct(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { deleteProduct, isPendingDeleteProduct };
};

export default useDeleteProduct;
