import { SellingOrderType } from 'src/types/selling.type';

export const getTotalPriceSelling = (selling: SellingOrderType) => {
  return selling?.details?.reduce((value, detail) => {
    return (value = value + detail?.price * detail?.quantity * ((100 - detail.discount) / 100));
  }, 0);
};
