import React from 'react';
import axiosClient from 'src/api/axiosClient';
import { inventoryType } from 'src/types/inventory';

const useGetInventory = (id: number) : [inventoryType[], boolean] => {
  const [inventories, setInventories] = React.useState<inventoryType[]>([]);
  const [isPendingGetInventory, setIsPendingGetInventory] = React.useState(true);

  React.useEffect(() => {
    axiosClient
      .get(`inventory/get-all/${id}`)
      .then((response) => setInventories(response.data))
      .then(() => setIsPendingGetInventory(false))
      .catch((err) => console.log(err));
  }, [id]);

  return  [inventories, isPendingGetInventory] ;
};

export default useGetInventory;
