import { metaData } from './MetaData';
import { ProductAttributeType } from './Product';
import { inventoryType } from './inventory';
import { SupplierType } from './supplier.type';
import { UserType } from './user.type';

export type FilterReceipt = {
  storeId?: number;
  inventoryId?: number;
  bookingUserId?: number;
  confirmUserId?: number;
  payStatus?: number;
  receiptStatus?: number;
  page?: number;
  searchString?: string;
  pageSize?: number;
  supplierId?: number;
  bookingFromTime?: string;
  bookingToTime?: string;
  receiptFromTime?: string;
  receiptToTime?: string;
  fromTotal?: number;
  toTotal?: number;
};

export type ReiceptProductType = {
  id: number;
  receiptId: number;
  productAttribute: ProductAttributeType;
  cost: number;
  quantity: number;
};

export type ReceiptsType = {
  id: number;
  key: number;
  code: string;
  supplier: SupplierType;
  bookingUser: UserType;
  confirmUser: UserType;
  inventory: inventoryType;
  storeId: number;
  paymentType: string;
  total: number;
  payStatus: number;
  receiptStatus: number;
  bookingDate: string;
  receiptDate: string;
  products: ReiceptProductType[];
};

export type ReceiptsList = {
  data: ReceiptsType[];
  metaData: metaData;
};
