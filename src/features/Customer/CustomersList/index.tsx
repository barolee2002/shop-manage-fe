import { Box, FormControl, Grid, InputAdornment, InputLabel, Menu, MenuItem, Select, TextField } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import CustomTable from 'src/general/components/Table/CustomeTable';
import { Search as SearchIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material';
import { useDebounce } from 'src/hook/useDebounce';
import { useSelector } from 'react-redux';
import { userModelSelector } from 'src/redux/selector';
import { CustomerColumn } from 'src/general/components/Table/TableColumn/TableColumns';

import 'src/utils/screenBaseStyle/baseScreenStyle.scss';
import './CustomersList.styles.scss';
import useGetCustomers from 'src/hook/customer/useGetCustomers';

const CustomerList = () => {
  const [searchString, setSearchString] = useState<string>('');
  const searchValue = useDebounce(searchString);
  const userModel = useSelector(userModelSelector);
  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);
  const { customers, metadata, isPendingGetCustomers, reFetchGetCustomers } = useGetCustomers(userModel.storeId);
  useEffect(() => {
    reFetchGetCustomers({ searchString: searchValue, page });
  }, [searchValue, page, pageSize]);
  const handleChangPage = (_: any, value: number) => {
    setPage(value);
  };
  return (
    <div className="list">
      <BaseLayout topbarChildren={<CustomeTopbar pageTitle="Danh sách khách hàng" />}>
        <Box className="content staff-list">
          <Box className="content-wrapper">
            <Grid container wrap="wrap" gap={4} className="content-wrapper-search">
              <Grid item container gap={4} xs={12} lg={7}>
                <p className="title-2">Khách hàng</p>
                <Grid lg={9}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Tìm kiếm theo mã hoặc tên khách hàng"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      setSearchString(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <CustomTable
              className="content-wrapper-table"
              columns={CustomerColumn}
              onChangePage={handleChangPage}
              loading={isPendingGetCustomers}
              rows={customers.map((customers) => ({ ...customers, key: customers.id }))}
              pagination
              metadata={metadata}
            />
          </Box>
        </Box>
      </BaseLayout>
    </div>
  );
};

export default memo(CustomerList);
