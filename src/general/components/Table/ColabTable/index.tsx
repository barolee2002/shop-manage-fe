import React from 'react';
import { Pagination, PaginationItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';

import '../style.scss';
import { TableProps } from 'src/types/TableType';
import ColabRow from '../Product/ColabRow';
import OnceRow from '../Product/OnceRow';

interface Props extends TableProps {
  subTable: (item: any) => React.ReactElement;
  colabRow: (...rest: any) => React.ReactElement;
  onceRow: (...rest: any) => React.ReactElement;
}

export default function ColabTable(props: Partial<Props>) {
  const [show, setShow] = React.useState(0);
  const handleSubTable = (id: any) => {
    show === 0 ? setShow(id) : setShow(0);
  };
  console.log(props.metadata);
  // React.useEffect(() => {
  //   props.
  // }, [])
  return (
    <React.Fragment>
      <Table className={`cutome-table ${props.className}`}>
        <TableHead>
          <TableRow className="cutome-table-head-row">
            <TableCell width={'1%'}></TableCell>
            {props.columns?.map((column) => (
              <TableCell key={column.field} className={column.headerClassName}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>{' '}
        </TableHead>
        <TableBody>
          {props.rows?.map((row) => (
            <React.Fragment key={row.key}>
              {/* <TableRow
                key={row.id}
                className="cutome-table-body-row"
                onClick={() => props.onRowClick && props.onRowClick(row)}
              >
                {row.subTableRow.length > 1 ? (
                  <TableCell onClick={() => handleSubTable(row.key)}>
                    {show == row.key ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                  </TableCell>
                ) : (
                  <TableCell></TableCell>
                )}
                {props.columns?.map((column) => (
                  <TableCell key={column.field}>
                    {column.renderCell ? column.renderCell(row) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow> */}
              {row.subTableRow.length > 1
                ? props.colabRow &&
                  props.colabRow({
                    row: row,
                    columns: props.columns,
                    open : show === row.key,
                    onOpen: () => handleSubTable(row.key),
                  })
                : props.onceRow && props.onceRow({ row: row, columns: props.columns })}
              {show === row.key && props.subTable && (
                <TableRow className="drop-down-row">
                  <TableCell colSpan={props.columns && props?.columns?.length + 1}>{props.subTable(row)}</TableCell>
                </TableRow>
              )}
            </React.Fragment>
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
