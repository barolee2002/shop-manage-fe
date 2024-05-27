import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { ProductType } from 'src/types/Product';

const useCreateProduct = (): [(data: ProductType) => Promise<ProductType>, boolean] => {
  const [isPendingCreateProduct, setIsPendingCreateProduct] = React.useState(false);
  const fetchApi = async (data: ProductType): Promise<ProductType> => {
    setIsPendingCreateProduct(true);
    try {
      const res = await axiosClient.post<ProductType>(`product/creating`, { ...data });
      setIsPendingCreateProduct(false);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return [fetchApi, isPendingCreateProduct];
};

export default useCreateProduct;
