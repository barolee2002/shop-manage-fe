import React from 'react';
import axiosClient from 'src/api/axiosClient';
const useGetBrand = (id: number): [string[], boolean] => {
  const [brands, setBrands] = React.useState<string[]>([]);
  const [isPendingGetBrand, setIsPendingGetBrand] = React.useState(true);
  React.useEffect(() => {
    axiosClient
      .get(`product/brands/${id}`)
      .then((response) => setBrands(response.data))
      .then(() => setIsPendingGetBrand(false))
      .catch((err) => console.log(err));
  }, [id]);

  return [brands, isPendingGetBrand];
};

export default useGetBrand;
