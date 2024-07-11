export const PATH_AUTH = {
  LOGIN_PATH: '/login',
  REGISTER: '/register',
  REGISTER_CHECK: '/confirm-account',
};

export const PATH_PRODUCT = {
  PRODUCT_CREATE_PATH: '/main/management/products/creating',
  PRODUCT_LIST_PATH: '/main/management/products',
  PRODUCT_DETAIL_PATH: '/main/management/products/:id',
};
export const PATH_RECEIPT_PRODUCT = {
  RECEIPT_PRODUCT_LIST_PATH: '/main/management/receipt-product',
  RECEIPT_PRODUCT_CREATE_PATH: '/main/management/receipt-product/edit',
  RECEIPT_PRODUCT_DETAIL_PATH: '/main/management/receipt-product/:id',
  INVENTORY_IN: '/main/management/inventory-in',
};
export const PATH_INVENTORY_TAKE_CARE = {
  INVENTORY_TAKE_CARE_LIST_PATH: '/main/management/inventory/stock-take',
  INVENTORY_TAKE_CARE_EDIT_PATH: '/main/management/inventory/stock-take/add',
  INVENTORY_TAKE_CARE_DETAIL_PATH: '/main/management/inventory/stock-take/:id',
};
export const PATH_STAFF = {
  STAFF_LIST_PATH: '/main/management/staff',
  STAFF_EDIT_PATH: '/main/management/staff/edit',
  STAFF_DETAIL_PATH: '/main/management/staff/:id',
};

export const PATH_SELLING = {
  SELLING_CREATING: '/selling',
  SELLING_LIST: '/main/management/selling',
  SELLING_DETAIL: '/main/management/selling/:id',
};

export const PATH_STOCK_MANAGEMENT = {
  STOCK_MANAGEMENT: '/main/management/stock',
  CREATE_STOCK: '/inventory/:storeId',
  UPDATE_STOCK: '/inventory/update/:id',
};

export const PATH_CUSTOMER = {
  CUSTOMER_LIST_PATH: '/main/management/customer',
  CUSTOMER_DETAIL: '/main/management/customer/:id',
};

export const PATH_SUPPLIER = {
  SUPPLIER_LIST_PATH: '/main/management/supplier',
  SUPPLIER_DETAIL: '/main/management/supplier/:id',
};
