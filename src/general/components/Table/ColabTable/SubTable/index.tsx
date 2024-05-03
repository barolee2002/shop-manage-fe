import { Box, Table, TableBody, TableCell, TableHead, TableRow, Pagination, PaginationItem } from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon, RowingTwoTone } from '@mui/icons-material';

import { TableProps } from 'src/types/TableType';
import './style.scss';
import React from 'react';
interface Props extends TableProps {
  pageTitle: string;
  show: boolean;
  pagination: boolean;
}

const SubTable = (props: Partial<Props>) => {
  return (
    <React.Fragment>
      <Box className="sub-table">
        <p className="sub-table-title">{props.pageTitle}</p>
        <Table className={`sub-table-content ${props.className}`}>
          <TableHead>
            <TableRow className="sub-table-content-head-row">
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
                className="sub-table-content-body-row"
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
        {props.pagination && (
          <div className="sub-table-content-pagination">
            <Pagination
              count={props.metadata?.totalPages}
              renderItem={(item) => (
                <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
              )}
              onChange={props.onChangePage}
            />
          </div>
        )}
      </Box>
    </React.Fragment>
  );
}

export default React.memo(SubTable);