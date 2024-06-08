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
export type OrderFIlter = {
  staffId:number;
  inventoryId: number;
  paymentType: string;
  sellFromTime: string;
  sellToTime: string;
  fromTotal: number;
  toTotal: number;
  page: number;
  pageSize:number
}
export type SellingOrderType = {
  id: number;
  code: string;
  customer: CustomerType;
  staff: UserType;
  inventory: inventoryType;
  total: number;
  discount: number;
  paymentType: string;
  createAt: string;
  details: OrderDetailType[];
};
