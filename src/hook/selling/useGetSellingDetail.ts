import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { SELLING_ENDPOINTS } from 'src/general/constants/endpoints';
import { SellingOrderType } from 'src/types/selling.type';

const useGetSellingDetail = (
  id: string
): {
  sellingDetail: SellingOrderType;
  isPendingGetSellingDetail: boolean;
  getSellingDetail: () => Promise<SellingOrderType>;
} => {
  const [isPendingGetSellingDetail, setIsPendingGetSellingDetail] = useState<boolean>(false);
  const [sellingDetail, setSellingDetail] = useState<SellingOrderType>({} as SellingOrderType);
  const fetchApi = async (): Promise<SellingOrderType> => {
    setIsPendingGetSellingDetail(true);
    try {
      const response = await axiosClient.get<SellingOrderType>(SELLING_ENDPOINTS.GET_SELLING_DETAIL.replace(':id', id));
      setSellingDetail(response.data);
      setIsPendingGetSellingDetail(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  return { sellingDetail, isPendingGetSellingDetail, getSellingDetail: fetchApi };
};

export default useGetSellingDetail;
