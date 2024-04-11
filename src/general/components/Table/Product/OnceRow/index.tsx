import { TableRow, TableCell } from '@mui/material';
import { TableProps } from 'src/types/TableType';

interface Props extends TableProps {
  row: {
    [key: string]: any;
  };
}

export default function OnceRow(props: Partial<Props>) {
  return (
    <TableRow>
      <TableCell></TableCell>
      {props.columns?.map((column) => (
        <TableCell key={column.field}>
          {column.renderCell ? column.renderCell(props.row) : props.row && props.row[column?.field]}
        </TableCell>
      ))}
    </TableRow>
  );
}
