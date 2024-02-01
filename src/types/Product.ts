export type ProductAttributeType = {
  id: number;
  productId: number;
  material: string;
  origin: string;
  size: string;
  imageLink: string;
  variation: string;
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
  imageLinks: string[];
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
