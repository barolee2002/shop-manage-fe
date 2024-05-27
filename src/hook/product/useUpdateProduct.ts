import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { ProductType } from 'src/types/Product';

const useUpdateProduct = (): [(data: ProductType) => Promise<ProductType>, boolean] => {
  const [isPendingUpdateProduct, setIsPendingUpdateProduct] = React.useState(false);
  const fetchApi = async (data: ProductType): Promise<ProductType> => {
    setIsPendingUpdateProduct(true);
    try {
      const res = await axiosClient.post<ProductType>(`product/update`, { ...data });
      setIsPendingUpdateProduct(false);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return [fetchApi, isPendingUpdateProduct];
};

export default useUpdateProduct;
