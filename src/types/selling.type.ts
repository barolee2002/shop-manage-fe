import { metaData } from './MetaData';
import { ProductAttributeType } from './Product';
import { CustomerType } from './customer.type';
import { inventoryType } from './inventory';
import { UserType } from './user.type';

export type OrderDetailType = {
  id: number;
  product: ProductAttributeType;
  discount: number;
  price: number;
  quantity: number;
};
export type OrderFilter = {
  staffId?:number;
  inventoryId?: number;
  paymentType?: string;
  sellFromTime?: string;
  sellToTime?: string;
  storeId?: number;
  fromTotal?: number;
  toTotal?: number;
  page?: number;
  pageSize?:number
}
export type SellingOrderType = {
  id: number;
  key: number;
  code: string;
  customer: CustomerType;
  staff: UserType;
  inventory: inventoryType;
  storeId: number;
  total: number;
  discount: number;
  paymentType: string;
  createAt: string;
  details: OrderDetailType[];
};
export type SellingList = {
  data: SellingOrderType[],
  metaData: metaData
}