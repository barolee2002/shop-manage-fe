import { useState } from 'react';
import axiosClient from 'src/api/axiosClient';
import { AUTH_ENDPOINTS } from 'src/general/constants/endpoints';

const useConfirmRegister = (): {
  confirmRegister: (confirmationToken: string) => Promise<number>;
  ispendingConfirmRegister: boolean;
} => {
  const [ispendingConfirmRegister, setIspendingConfirmRegister] = useState<boolean>(false);
  const fetchApi = async (token: string): Promise<number> => {
    setIspendingConfirmRegister(true);
    try {
      const response = await axiosClient.get<number>(AUTH_ENDPOINTS.REGISTER_CONFIRM, {
        params: {
            token,
        },
      });
      setIspendingConfirmRegister(false);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return { confirmRegister: fetchApi, ispendingConfirmRegister };
};

export default useConfirmRegister;
