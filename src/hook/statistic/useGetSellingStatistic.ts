import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { STATISTIC_ENDPONTS } from 'src/general/constants/endpoints';
import { StatisticType } from 'src/types/statistic.type';

const useGetStatistic = (
  id: number
): { statistic: StatisticType; isPendingStatictic: boolean; reFetchStatictic: ({inventoryId, time} : {inventoryId: number; time: string}) => Promise<StatisticType> } => {
  const [statistic, setstatistic] = useState<StatisticType>({} as StatisticType);
  const [isPendingStatictic, setIsPendingStatictic] = useState<boolean>(false);
  const fetchApi = async ({inventoryId, time} : {inventoryId: number; time?: string}): Promise<StatisticType> => {
    setIsPendingStatictic(true);
    try {
      const response = await axiosClient.get<StatisticType>(
        STATISTIC_ENDPONTS.STATISTIC.replace(':storeId', id as unknown as string),
        {
          params: {
            storeId: id,
            inventoryId,
            time
          }
        }
      );
      setIsPendingStatictic(false);
      setstatistic(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { statistic, isPendingStatictic, reFetchStatictic: fetchApi };
};

export default useGetStatistic;
