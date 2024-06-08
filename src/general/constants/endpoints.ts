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
  STOCK_TAKE_DETAIL: 'stock-take/detail/:id',
  DELETE: 'stock-take/delete/:id',
  UPDATE_INVENTORY: 'stock-take/inventory/:id',
};

export const ENDPOINTS_SUPPLIER = {
  GET_SUPPLIER_LIST_ENDPOINT: 'supplier/get-all/:storeId',
};

export const ENDPOINT_USER = {
  GET_USER_LIST_ENDPOINT: 'user/get-all/:storeId',
  GET_DETAIL: 'user/:id',
  CREATE_USER: 'user/signup',
  CREATE_STAFF: 'user/staff',
  UPDATE_USER: 'user/updating/:id',
  GET_USER_PAGE: 'user/get-page/:storeId',
};

export const HISTORY_ENDPOINT = {
  ACTION_HISTORY_ENDPOINT: 'action-history/add',
};

export const AUTH_ENDPOINTS = {
  LOGIN_ENDPOINT: 'user/login',
  LOGOUT_ENDPOINT: 'user/logout',
};

export const SELLING_ENDPOINTS = {
  CREATE_SELLING: 'selling-order/creating',
  GET_SELLING_TIKETS: 'selling-order/list-all/:storeId',
};

export const CUSTOMER_ENDPOINTS = {
  GET_CUSTOMERS: 'customer/list-all/:storeId',
};
