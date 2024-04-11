import React from 'react';
import { metaData } from 'src/types/MetaData';
import { Pagination, PaginationItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

import '../style.scss';

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
interface Props {
  columns: Column[];
  rows: Row[];
  metadata: metaData;
  onChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  onRowClick: (item: any) => void;
  className: string;
}

export default function CustomTable(props: Partial<Props>) {
  console.log(props.metadata);
  // React.useEffect(() => {
  //   props.
  // }, [])
  return (
    <React.Fragment>
      <Table className={`cutome-table ${props.className}`}>
        <TableHead>
          <TableRow className="cutome-table-head-row">
            {props.columns?.map((column) => (
              <TableCell key={column.field} className={column.headerClassName}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>{' '}
        </TableHead>
        <TableBody>
          {props.rows?.map((row) => (
            <TableRow
              key={row.id}
              className="cutome-table-body-row"
              onClick={() => props.onRowClick && props.onRowClick(row)}
            >
              {props.columns?.map((column) => (
                <TableCell key={column.field}>
                  {column.renderCell ? column.renderCell({ value: row[column.field] }) : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="cutome-table-pagination">
        <Pagination
          count={props.metadata?.totalPages}
          renderItem={(item) => (
            <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
          )}
          onChange={props.onChangePage}
        />
      </div>
    </React.Fragment>
  );
}
