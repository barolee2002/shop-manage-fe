import { useEffect, useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { STATISTIC_ENDPONTS } from 'src/general/constants/endpoints';
import { StatisticDetailType } from 'src/types/statistic.type';

const useGetStatisticDetail = (
  id: number
): {
  statisticDetail: StatisticDetailType[];
  isPendingStaticticDetail: boolean;
  reFetchStaticticDetail: ({ inventoryId, time }: { inventoryId: number; time: string }) => Promise<StatisticDetailType[]>;
} => {
  const [statisticDetail, setstatisticDetail] = useState<StatisticDetailType[]>([]);
  const [isPendingStaticticDetail, setIsPendingStaticticDetail] = useState<boolean>(false);
  const fetchApi = async ({
    inventoryId,
    time,
  }: {
    inventoryId: number;
    time?: string;
  }): Promise<StatisticDetailType[]> => {
    setIsPendingStaticticDetail(true);
    try {
      const response = await axiosClient.get<StatisticDetailType[]>(
        STATISTIC_ENDPONTS.STATISTIFC_DETAIL.replace(':storeId', id as unknown as string),
        {
          params: {
            storeId: id,
            inventoryId,
            time,
          },
        }
      );
      setIsPendingStaticticDetail(false);
      setstatisticDetail(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { statisticDetail, isPendingStaticticDetail, reFetchStaticticDetail: fetchApi };
};

export default useGetStatisticDetail;
