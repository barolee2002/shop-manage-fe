import React from 'react';
import axiosClient from 'src/api/axiosClient';
const useGetCategory = (id: number) : [string[], boolean] => {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [isPendingGetCategories, setIsPendingGetCategories] = React.useState(true);

  React.useEffect(() => {
    axiosClient
      .get(`product/categories/${id}`)
      .then((response) => {
        setCategories(response.data);
        setIsPendingGetCategories(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return [categories, isPendingGetCategories];
};

export default useGetCategory;
