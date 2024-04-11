export type MetafieldRequest = {
  id?: number;
  //Max=255
  description?: string;
  //Max=30
  key: string;
  //Max=20
  namespace: string;
  value?: string;
  value_type: 'string' | 'integer';
};
export type PreviousPageType = {
  title : string;
  link : string;
}