import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { TableProps, unknowType } from 'src/types/TableType';
import { ProductType } from 'src/types/Product';

import {
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
interface Props extends TableProps {
  row: {
    [key: string]: any;
  };
  open: boolean;
  onOpen: () => void;
}
export default function ColabRow(props: Partial<Props>[]) {
  const { onOpen, open, columns, row ,onRowClick} = props[0];
  return (
    <TableRow>
      <TableCell onClick={onOpen} width={'6%'}>
        {open ? (
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        ) : (
          <IconButton>
            <KeyboardArrowRightIcon />
          </IconButton>
        )}
      </TableCell>
      {columns?.map((column) => (
        <TableCell key={column.field} onClick={() => onRowClick && onRowClick(row)}>
          {column.renderCell ? column.renderCell(row) : row && row[column.field]}
        </TableCell>
      ))}
    </TableRow>
  );
}
