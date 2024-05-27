import { metaData } from './MetaData';
import { ProductAttributeType } from './Product';
import { inventoryType } from './inventory';
import { UserType } from './user.type';

export type FilterStockTakeType = {
  storeId: number;
  inventoryId: number;
  confirmUser: number;
  createUser: number;
  status: number;
  page: number;
  searchString: string;
  pageSize: number;
  createFromTime: string;
  createToTime: string;
  updateFromTime: string;
  updateToTime: string;
};
export type StockTakeDetailType = {
  id: number;
  stockTake: number;
  productAttribute: ProductAttributeType;
  oldQuantity: number;
  actualQuantity: number;
  reason: string;
};
export type StockTakeType = {
  id: number;
  key: number;
  code: string;
  createUser: UserType;
  confirmUser: UserType;
  inventory: inventoryType;
  storeId: number;
  status: number;
  createAt: string;
  updateAt: string;
  details: StockTakeDetailType[];
};

export type StockTakeList = {
  data: StockTakeType[];
  metaData: metaData;
};
