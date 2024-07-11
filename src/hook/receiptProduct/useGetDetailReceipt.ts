import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { RECEIPT_ENDPOINTS } from 'src/general/constants/endpoints';
import { ReceiptsType } from 'src/types/ReceiptType';

const useGetReceiptProduct = (
  id: string
): [data: ReceiptsType, pending: boolean, fetchData: () => Promise<ReceiptsType>] => {
  const [isPendingGetReceiptProduct, setIsPendingGetReceiptProduct] = useState<boolean>(false);
  const [receiptDetail, setReceiptDetail] = useState<ReceiptsType>({} as ReceiptsType);
  const fetchApi = async (): Promise<ReceiptsType> => {
    setIsPendingGetReceiptProduct(true);
    try {
      const response = await axiosClient.get<ReceiptsType>(RECEIPT_ENDPOINTS.RECEIPT_DETAIL.replace(':id', id));
      setReceiptDetail(response.data);
      setIsPendingGetReceiptProduct(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  return [receiptDetail, isPendingGetReceiptProduct, fetchApi];
};

export default useGetReceiptProduct;
