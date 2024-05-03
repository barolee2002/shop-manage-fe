import { TableRow, TableCell } from '@mui/material';
import { ProductType } from 'src/types/Product';
import { TableProps, unknowType } from 'src/types/TableType';

interface Props extends TableProps {
  row: {
    [key: string]: any;
  };
  onCellClick?: (field: string , item : any) => void

}

export default function OnceRow(props: Partial<Props>[]) {
  const { columns, row,onRowClick,onCellClick } = props[0];
  return (
    <TableRow>
      <TableCell width={'6%'}></TableCell>
      {columns?.map((column) => (
        <TableCell key={column.field} onClick={() => {
          onCellClick &&
          onRowClick && onRowClick(row)
          }}>
          {column.renderCell ? column.renderCell(row) : row && row[column?.field]}
        </TableCell>
      ))}
    </TableRow>
  );
}
