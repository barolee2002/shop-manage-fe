import { PaymentType, metaData } from 'src/types/MetaData';
import { ProductAttributeType, ProductType, InventoryType, InventoryCost } from 'src/types/Product';
import { ReceiptsType, ReiceptProductType } from 'src/types/ReceiptType';
import { inventoryType } from 'src/types/inventory';
import { FilterStockTakeType, StockTakeDetailType, StockTakeList, StockTakeType } from 'src/types/stokeTakeTypes';
import { SupplierType } from 'src/types/supplier.type';
import { UserType } from 'src/types/user.type';

export const initialProductAttribute: ProductAttributeType = {
  id: 0,
  code: '',
  productName: '',
  costPrice: 0,
  sellPrice: 0,
  productId: 0,
  imageLink: '',
  quantity: 0,
  otherAttribute: [{ name: '', value: '' }],
  inventoryList: [],
};
export const initialProduct: ProductType = {
  id: 0,
  key: 0,
  name: '',
  status: 0,
  storeId: 0,
  brand: '',
  category: '',
  minPrice: 0,
  totalQuantity: 0,
  maxPrice: 0,
  imageLink: '',
  attributes: [initialProductAttribute],
  createAt: '',
  updatedAt: '',
};
export const initialInventory: inventoryType = {
  id: 0,
  code: '',
  name: '',
  storeId: 0,
  status: 0,
  address: '',
  createAt: '',
};
// Initial value for InventoryCost
export const initialInventoryCost: InventoryCost = {
  id: 0,
  inventory: initialInventory,
  productId: 0,
  costPrice: 0,
  sellPrice: 0,
  quantity: 0,
};

export const initialPayment: PaymentType[] = [
  {
    type: 'BANKING',
    field: 'Chuyển khoản ngân hàng',
  },
  {
    type: 'CREDITCARD',
    field: 'Thẻ',
  },
  {
    type: 'MONEY',
    field: 'tiền mặt',
  },
];


export const initialReceiptProduct: ReiceptProductType = {
  id: 0,
  receiptId: 0,
  productAttribute: initialProductAttribute,
  cost: 0,
  quantity: 0,
};

export const initialSupplier: SupplierType = {
  id: 0,
  code: '',
  name: '',
  storeId: 0,
  address: '',
  email: '',
  phone: '',
  deptMoney: 0,
  createAt: '',
};

export const initialUser: UserType = {
  id: 0,
  code: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  username: '',
  role: '',
  storeId: 0,
};

export const initialReceipt: ReceiptsType = {
  id: 0,
  key: 0,
  code: '',
  supplier: initialSupplier,
  bookingUser: initialUser,
  confirmUser: initialUser,
  inventory: initialInventory,
  storeId: 0,
  paymentType: '',
  total: 0,
  payStatus: 0,
  receiptStatus: 0,
  bookingDate: '',
  receiptDate: '',
  products: [initialReceiptProduct],
};
// Assuming that UserType, ProductAttributeType, inventoryType, and metaData are already defined elsewhere in your code

// Initial value for FilterStockTakeType
export const initialFilterStockTake: FilterStockTakeType = {
  storeId: 0,
  inventoryId: 0,
  confirmUser: 0,
  createUser: 0,
  status: 0,
  page: 1,
  searchString: '',
  pageSize: 10,
  createFromTime: '',
  createToTime: '',
  updateFromTime: '',
  updateToTime: ''
};

// Initial value for StockTakeDetailType
export const initialStockTakeDetail: StockTakeDetailType = {
  id: 0,
  stockTake: 0,
  productAttribute: initialProductAttribute,
  oldQuantity: 0,
  actualQuantity: 0,
  reason: ''
};

// Initial value for StockTakeType
export const initialStockTake: StockTakeType = {
  id: 0,
  key: 0,
  code: '',
  createUser: initialUser,
  confirmUser: initialUser,
  inventory: initialInventory,
  storeId: 0,
  status: 0,
  createAt: '',
  updateAt: '',
  details: [initialStockTakeDetail]
};

// Initial value for StockTakeList
export const initialStockTakeList: StockTakeList = {
  data: [initialStockTake],
  metaData: {} as metaData
};

// Now you can use these initial values in your components or other parts of your code
