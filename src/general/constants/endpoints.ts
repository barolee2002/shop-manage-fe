export const ENDPOINTS_PRODUCT = {
  GET_PRODUCTS_LIST_ENDPOINT: 'product/all',
};

export const ENDPOINTS_RECEIPT = {
  GET_RECEIPT_LIST_ENDPOINT: 'goods_receipt/get-all',
  CREATE_RECEIPT_ENDPOINT: 'goods_receipt/creating',
  RECEIPT_DETAIL: 'goods_receipt/detail/:id',
  PAY: 'goods_receipt/pay/:id',
  INVENTORY_IN: 'goods_receipt/inventory-in/:id',
  DELETE: 'goods_receipt/delete/:id',
};

export const ENDPOINTS_STOCK_TAKE = {
  GET_STOCK_TAKE_LIST_ENDPOINT: 'stock-take/get-all',
  UPDATE: 'stock-take/updating',
  CREATE_RECEIPT_ENDPOINT: 'stock-take/creating',
  RECEIPT_DETAIL: 'stock-take/detail/:id',
  DELETE: 'stock-take/delete/:id',
  UPDATE_INVENTORY: 'stock-take/inventory/:id',
};

export const ENDPOINTS_SUPPLIER = {
  GET_SUPPLIER_LIST_ENDPOINT: 'supplier/get-all/:storeId',
};

export const ENDPOINT_USER = {
  GET_USER_LIST_ENDPOINT: 'user/get-all/:storeId',
};

export const HISTORY_ENDPOINT = {
  ACTION_HISTORY_ENDPOINT: 'action-history/add',
};
