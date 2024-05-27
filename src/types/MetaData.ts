export type metaData = {
  elements: number;
  totalElements: number;
  totalPages: number;
};

export type PaymentType = {
  type: string,
  field: string,
}
export type AlertType = {
  open: boolean;
  message: string;
  type: any;
}