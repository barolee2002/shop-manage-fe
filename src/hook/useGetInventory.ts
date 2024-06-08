import React from 'react';
import { useDispatch } from 'react-redux';
import axiosClient from 'src/api/axiosClient';
import { updateInventory } from 'src/features/Auth/screens/SignInScreen/inventorySlice';

import { inventoryType } from 'src/types/inventory';

const useGetInventory = (): {
  getInventories: (id: number) => Promise<inventoryType[]>;
} => {
  const dispatch = useDispatch();

  const handleGetInventory = async (inventoryId: number): Promise<inventoryType[]> => {
    try {
      const response = await axiosClient.get<inventoryType[]>(`inventory/get-all/${inventoryId}`);
      dispatch(updateInventory(response.data));
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {getInventories: handleGetInventory };
};

export default useGetInventory;
