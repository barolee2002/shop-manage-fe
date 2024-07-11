import { metaData } from './MetaData';

export type StockManagementFilter = {
  inventoryId?: number;
  time?: string;
  serchString?: string;
  quantity?: number;
  page?: number;
  minQuantity?: number;
  pageSize?: number;
};

export type StockProductManagerment = {
  id: number;
  code: string;
  key: number;
  productId: number;
  productName: number;
  productBrand: string;
  productCategory: string;
  imageLink: string;
  otherAttribute: {
    name: string;
    value: string;
  }[];
  costPrice: number;
  sellPrice: number;
  quantity: number;
};
export type StockManagementList = {
  data: StockProductManagerment[];
  metaData: metaData;
};
