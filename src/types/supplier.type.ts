import { metaData } from './MetaData';

export type SupplierType = {
  id: number;
  code: string;
  name: string;
  storeId: number;
  address: string;
  email: string;
  phone: string;
  orderQuantity?: number;
  totalOrderMoney?: number;
  deptMoney: number;
  createAt: string;
};

export type SupplierFilter = {
  searchString?: string;
  fromTotal?: number;
  toTotal?: number;
  page?: number;
  pageSize?: number;
};
export type SupplierPage = {
  data: SupplierType[];
  metaData: metaData;
};
