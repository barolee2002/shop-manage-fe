/* eslint-disable import/named */
import { metaData } from 'src/types/MetaData';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Box, Pagination, PaginationItem } from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import CustomNoRowsOverlay from '../NoRowsOverlay';

interface row {
  key: number;
}

interface Props {
  columns: GridColDef[];
  rows: row[];
  metadata: metaData;
  onChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  onRowClick: (item: any) => void;
}
export default function OverviewTable(props: Props) {
  const { columns, rows, metadata, onChangePage, onRowClick } = props;
  return (
    <Box className="content-wrapper-table">
      <DataGrid
        columns={columns}
        rows={rows.map((row, index) => {
          return {
            ...row,
            key: index + 1,
          };
        })}
        disableColumnMenu
        onRowClick={(item) => {
          onRowClick(item.row);
        }}
        disableColumnFilter
        disableRowSelectionOnClick
        disableColumnSelector
        hideFooterPagination
        hideFooter
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        autoHeight
        autoPageSize
        // autoPageSize
        getRowClassName={() => 'content-wrapper-table-row'}
        sx={{ '--DataGrid-overlayHeight': '300px', fontSize: '14px' }}
      />
      <div className="content-wrapper-table-pagination">
        <Pagination
          count={metadata.totalPages}
          renderItem={(item) => (
            <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
          )}
          onChange={onChangePage}
        />
      </div>
    </Box>
  );
}
