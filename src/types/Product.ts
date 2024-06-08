import { metaData } from './MetaData';

export type FilterProductType = {
  storeId?: number;
  searchString?: string;
  category?: string;
  page?: number;
  pageSize?:number;
  inventoryId?: number;
  fromTime?: string;
  toTime?: string;
};
export type ProductAttributeType = {
  id: number;
  code: string;
  productName: string;
  costPrice: number;
  sellPrice: number;
  productId: number;
  imageLink: string;
  quantity: number;
  otherAttribute: {
    name: string;
    value: string;
  }[];
  inventoryList: InventoryCost[];
};
export type ProductList = {
  data: ProductType[];
  metaData: metaData;
};
export type ProductType = {
  id: number;
  key: number;
  name: string;
  status: number;
  storeId: number;
  brand: string;
  category: string;
  minPrice: number;
  totalQuantity: number;
  maxPrice: number;

  imageLink: string;
  attributes: ProductAttributeType[];
  createAt: string;
  updatedAt: string;
};
export type InventoryType = {
  id: number;
  name: string;
  code: string;
  address: string;
  createAt: string;
};
export type InventoryCost = {
  id: number;
  inventory: InventoryType;
  productId: number;
  costPrice: number;
  sellPrice: number;
  quantity: number;
};
