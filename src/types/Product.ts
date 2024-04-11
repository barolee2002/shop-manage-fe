export type ProductAttributeType = {
  id: number;
  code: string;
  costPrice: number;
  sellPrice: number;
  productId: number;
  imageLink: string;
  quantity : number;
  otherAttribute: {
    name: string;
    value: string;
  }[];
  inventoryList: InventoryCost[];
};
export type ProductType = {
  id: number;
  key: number;
  code: string;
  name: string;
  status: number;
  ownerId: number;
  brand: string;
  category: string;
  minPrice: number;
  totalQuantity: number;
  maxPrice: number;

  imageLinks: string;
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
