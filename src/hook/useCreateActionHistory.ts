import axiosClient from 'src/api/axiosClient';
import { HISTORY_ENDPOINT } from 'src/general/constants/endpoints';

interface action {
  message: string;
}

const useCreateActionHistory = (): [(data: action) => Promise<any>] => {
  const fetchApi = async (data: action) => {
    try {
      const res = await axiosClient.post(HISTORY_ENDPOINT.ACTION_HISTORY_ENDPOINT, { ...data });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return [fetchApi];
};

export default useCreateActionHistory;
