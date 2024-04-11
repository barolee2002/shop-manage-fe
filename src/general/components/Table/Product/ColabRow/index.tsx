import { TableRow, TableCell } from '@mui/material';
import { TableProps } from 'src/types/TableType';
import {
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
interface Props extends TableProps {
  row: {
    [key: string]: any;
  };
  open: boolean;
  onOpen : () => void
}
export default function ColabRow(props: Partial<Props>) {
  return (
    <TableRow>
      <TableCell onClick={props.onOpen}>
        {props.open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
      </TableCell>
      {props.columns?.map((column) => (
        <TableCell key={column.field}>
          {column.renderCell ? column.renderCell(props.row) : props.row && props?.row[column.field]}
        </TableCell>
      ))}
    </TableRow>
  );
}
