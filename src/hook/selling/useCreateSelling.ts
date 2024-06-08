import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { SELLING_ENDPOINTS } from 'src/general/constants/endpoints';
import { SellingOrderType } from 'src/types/selling.type';

const useCreateSelling = (): {
  createSelling: (data: SellingOrderType) => Promise<SellingOrderType>;
  isPendingCreateSelling: boolean;
} => {
  const [isPendingCreateSelling, setIsPendingCreateSelling] = useState<boolean>(false);
  const fetchApi = async (data: SellingOrderType): Promise<SellingOrderType> => {
    setIsPendingCreateSelling(true);
    try {
      const response = await axiosClient.post<SellingOrderType>(SELLING_ENDPOINTS.CREATE_SELLING, {
        ...data,
      });
      setIsPendingCreateSelling(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { createSelling: fetchApi, isPendingCreateSelling };
};

export default useCreateSelling;
