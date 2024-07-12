import { metaData } from './MetaData';
export type ActionHistoryType = {
  userId: number;
  message: string;
  createAt: string;
  id: number;
};
export type UserType = {
  id: number;
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  username: string;
  password?: string;
  inventoryId: number;
  avatar: string;
  role: string;
  storeId: number;
  actionHistories: ActionHistoryType[]
};
export type UserLogin = {
  username: string;
  name: string;
  storeId: number;
  id: number;
  token: string;
  expireTime: string;
  isAuthentication: number;
};

export type UserPageType = {
  data: UserType[];
  metaData: metaData;
};
