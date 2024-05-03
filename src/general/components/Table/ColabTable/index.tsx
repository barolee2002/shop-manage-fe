import React from 'react';
import { Collapse, Pagination, PaginationItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

import '../style.scss';
import { TableProps } from 'src/types/TableType';

interface Props extends TableProps {
  subTable: (item: any) => React.ReactElement;
  colabRow: (...rest: any) => React.ReactElement;
  onceRow: (...rest: any) => React.ReactElement;
}

const ColabTable = (props: Props) => {
  const { pagination = false } = props;
  const [show, setShow] = React.useState(0);
  const handleSubTable = (id: any) => {
    show === 0 ? setShow(id) : setShow(0);
  };
  return (
    <React.Fragment>
      <Table className={`cutome-table ${props.className}`}>
        <TableHead>
          <TableRow className="cutome-table-head-row">
            <TableCell width={'2%'}></TableCell>
            {props.columns?.map((column) => (
              <TableCell key={column.field} className={column.headerClassName}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows?.map((row) => (
            <React.Fragment key={row.key}>
              {row.subTableRow.length > 1
                ? props.colabRow &&
                  props.colabRow({
                    row: row,
                    columns: props.columns,
                    open: show === row.key,
                    onOpen: () => handleSubTable(row.key),
                    onRowClick: props.onRowClick,
                  })
                : props.onceRow &&
                  props.onceRow({
                    row: row,
                    columns: props.columns,
                    onRowClick: () => props.onRowClick && props.onRowClick(row),
                  })}

              <TableRow>
                <TableCell
                  colSpan={props.columns && props?.columns?.length + 1}
                  sx={{ paddingBottom: 0, paddingTop: 0 }}
                >
                  <Collapse in={show === row.key} unmountOnExit>
                    {props.subTable(row)}
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
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
};

export default React.memo(ColabTable);
