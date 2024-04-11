import { metaData } from "./MetaData";

interface Column {
  field: string;
  headerName: string | undefined;
  headerClassName: string | undefined;
  renderCell?: (item: any) => JSX.Element | null | undefined;
  [key: string]: any;
}
interface Row {
  key: any;
  [key: string]: any;
}
export interface TableProps {
  columns: Column[];
  rows: Row[];
  metadata: metaData;
  onChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  onRowClick: (item: any) => void;
  className: string;
}