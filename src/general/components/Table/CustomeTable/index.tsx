import React from 'react';
import { metaData } from 'src/types/MetaData';
import { TableProps } from 'src/types/TableType';
import { Pagination, PaginationItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

import '../style.scss';
import Loading from '../../Loading';

export default function CustomTable(props: TableProps) {
  const { pagination = false, loading = false } = props;
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
          </TableRow>
        </TableHead>
        <TableBody className={loading ? 'mh300' : ''}>
          {loading && <Loading isLoading={loading} size={50} />}
          {props.rows?.map((row) => (
            <TableRow
              key={row.id}
              className="cutome-table-body-row"
              onClick={() => props.onRowClick && props.onRowClick(row)}
            >
              {props.columns?.map((column) => (
                <TableCell key={column.field}>
                  {column.renderCell ? column.renderCell(row) : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pagination && (
        <div className="cutome-table-pagination">
          <Pagination
            count={props.metadata?.totalPages}
            renderItem={(item) => (
              <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
            )}
            onChange={props.onChangePage}
          />
        </div>
      )}
    </React.Fragment>
  );
}
