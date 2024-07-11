import { metaData } from './MetaData';

export type CustomerType = {
  id: number;
  code: string;
  name: string;
  phone: string;
  storeId: number;
  totalOrder?: number;
  totalMoney?: number;
  createAt: string;
};
export type CustomerList = {
  data: CustomerType[];
  metaData: metaData;
};

export type TopCustomerType = {
  customer: CustomerType;
  totalExpenditure: number;
  totalOrder: number;
}
