import { metaData } from './MetaData';

export type CustomerType = {
  id: number;
  code: string;
  name: string;
  phone: string;
  storeId: number;
  createAt: string;
};
export type CustomerList = {
  data: CustomerType[];
  metaData: metaData;
};
