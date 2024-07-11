export const ENDPOINTS_PRODUCT = {
  GET_PRODUCTS_LIST_ENDPOINT: 'product/all',
};

export const RECEIPT_ENDPOINTS = {
  GET_RECEIPT_LIST_ENDPOINT: 'goods_receipt/get-all',
  CREATE_RECEIPT_ENDPOINT: 'goods_receipt/creating',
  RECEIPT_DETAIL: 'goods_receipt/detail/:id',
  PAY: 'goods_receipt/pay/:id',
  INVENTORY_IN: 'goods_receipt/inventory-in/:id',
  DELETE: 'goods_receipt/delete/:id',
};

export const STOCK_TAKE_ENDPOINTS = {
  GET_STOCK_TAKE_LIST_ENDPOINT: 'stock-take/get-all',
  UPDATE: 'stock-take/updating',
  CREATE_RECEIPT_ENDPOINT: 'stock-take/creating',
  STOCK_TAKE_DETAIL: 'stock-take/detail/:id',
  DELETE: 'stock-take/delete/:id',
  UPDATE_INVENTORY: 'stock-take/inventory/:id',
};

export const ENDPOINTS_SUPPLIER = {
  GET_SUPPLIER_LIST_ENDPOINT: 'supplier/get-all/:storeId',
  GET_SUPPLIER_PAGE_ENDPOINT: 'supplier/list-all/:storeId',
  GET_SUPPLIER_DETAIL: 'supplier/get-detail/:id',
  CREATE_SUPPLIER: 'supplier/creating',
  DELETE_SUPPLIER: 'supplier/delete/:id',
  UPDATE_SUPPLIER: 'supplier/update',
};

export const ENDPOINT_USER = {
  GET_USER_LIST_ENDPOINT: 'user/get-all/:storeId',
  GET_DETAIL: 'user/:id',
  CREATE_USER: 'user/signup',
  CREATE_STAFF: 'user/staff',
  UPDATE_USER: 'user/updating/:id',
  GET_USER_PAGE: 'user/get-page/:storeId',
  GET_WORK_POINTS: 'user/export-work-points',
};

export const HISTORY_ENDPOINT = {
  ACTION_HISTORY_ENDPOINT: 'action-history/add',
};

export const AUTH_ENDPOINTS = {
  LOGIN_ENDPOINT: 'user/login',
  LOGOUT_ENDPOINT: 'user/logout',
  REGISTER_CONFIRM: 'user/confirm-account',
};

export const SELLING_ENDPOINTS = {
  CREATE_SELLING: 'selling-order/creating',
  GET_SELLING_TIKETS: 'selling-order/list-all/:storeId',
  GET_SELLING_CUSTOMER: 'selling-order/customer/:customerId',
};

export const CUSTOMER_ENDPOINTS = {
  GET_CUSTOMERS: 'customer/list-all/:storeId',
  GET_CUSTOMER_DETAIL: 'customer/get-detail/:id',
  CREATE_CUSTOMER: 'customer/creating',
  GET_TOP_CUSTOMER_ECPENDITURE: 'customer/list-top-expenditure/:storeId',
  GET_TOP_CUSTOMER_ORDER: 'customer/list-top-order/:storeId',
};
export const STOCK_MANAGEMENT_ENDPOINTS = {
  STOCK_MANAGEMENT: '/product-attributes/stock-management',
  CREATE_STOCK: '/inventory/:storeId',
  UPDATE_STOCK: '/inventory/update/:id',
  DELETE_STOCK: '/inventory/delete/:id',
  GET_INVENTORIES: '/inventory/get-all/:storeId',
  GET_STAFFS: '/inventory/:id/staffs',
}
export const STATISTIC_ENDPONTS = {
  STATISTIC : 'selling-order/statistic/:storeId',
  STATISTIFC_DETAIL : 'selling-order/statistic-detail/:storeId'
}