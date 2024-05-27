import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { ENDPOINTS_PRODUCT } from 'src/general/constants/endpoints';
import { FilterProductType, ProductList } from 'src/types/Product';

const useGetProductList = (): [(data: FilterProductType) => Promise<ProductList>, boolean] => {
  const [isPendingGetProductList, setIsPendingGetProductList] = useState<boolean>(false);
  const fetchApi = async (data: FilterProductType): Promise<ProductList> => {
    setIsPendingGetProductList(true);
    try {
      const response = await axiosClient.get<ProductList>(ENDPOINTS_PRODUCT.GET_PRODUCTS_LIST_ENDPOINT, {
        params: {
          ...data,
        },
      });
      setIsPendingGetProductList(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return [fetchApi, isPendingGetProductList];
};

export default useGetProductList;
