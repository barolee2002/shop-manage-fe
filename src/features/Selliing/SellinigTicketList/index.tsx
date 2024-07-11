import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, InputLabel, FormControl, MenuItem, TextField, Grid } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';

import Select from '@mui/material/Select';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import { metaData } from 'src/types/MetaData';
import { useDebounce } from 'src/hook/useDebounce';
import Filter from 'src/general/components/Filter';
import DateTimefield from 'src/general/components/Filter/DateTimefield';
import SelectField from 'src/general/components/Filter/SelectField';
import { Dayjs } from 'dayjs';
import useGetUsers from 'src/hook/user/useGetStaff';
import NumberRangeField from 'src/general/components/Filter/NumberRangeField';
import { getDayjsFormatDate } from 'src/utils/formatDate';
import 'src/utils/screenBaseStyle/baseScreenStyle.scss';
import CustomTable from 'src/general/components/Table/CustomeTable';
import { SellingTicketColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import { inventorySelector, userModelSelector } from 'src/redux/selector';
import { useSelector } from 'react-redux';
import useGetSellingTiketList from 'src/hook/selling/useGetSellingTiketList';
import { OrderFilter, SellingOrderType } from 'src/types/selling.type';
import { initialPayment } from 'src/utils/initialValue';

const ReceiptProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userModel = useSelector(userModelSelector);
  const inventories = useSelector(inventorySelector);
  const {getSellingTikets, isPendingGetSellingTickets} = useGetSellingTiketList(userModel.storeId);
  const { staffs } = useGetUsers(userModel.storeId);
  const [createActionHistory] = useCreateActionHistory();
  const [searchString, setSearchString] = useState<string>('');
  const searchValue = useDebounce(searchString);
  const [filterForm, setFilterForm] = useState<OrderFilter>({
    storeId: userModel.storeId,
    inventoryId: inventories[0]?.id,
    searchString: searchValue,
  } as OrderFilter);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const [sellingTickets, setSellingTickets] = useState<SellingOrderType[]>([]);
  const handleChangeFilterForm = (title: string, value: any) => {
    setFilterForm(() => ({
      ...filterForm,
      [title]: value,
    }));
  };
  const handleSetRange = (fromField: string, toField: string, fromValue: any, toValue: any) => {
    setFilterForm(() => ({
      ...filterForm,
      [fromField]: fromValue,
      [toField]: toValue,
    }));
  };

  const handleFetchData = useCallback(() => {
    getSellingTikets(filterForm)
      .then((res) => {
        setSellingTickets(() => {
          return res?.data?.map((data) => ({ ...data, key: data.id }));
        });
        setMetadata(res.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterForm, getSellingTikets]);
  useEffect(() => {
    createActionHistory({ message: 'Màn hình danh sách đơn bán hàng' });
  }, []);
  useEffect(() => {
    handleFetchData();
  }, [filterForm.page, filterForm.inventoryId, searchValue, inventories]);
  const handleFilter = () => {
    handleFetchData();
  };
  const handleChangPage = (_: any, value: number) => {
    handleChangeFilterForm('page', value);
  };
  return (
    <div className="list">
      <BaseLayout topbarChildren={<CustomeTopbar pageTitle="Danh sách phiếu mua hàng" />}>
        <Box className="content">
          <Box className="content-wrapper">
            <Grid container wrap="wrap" gap={4} className="content-wrapper-search">
              <Grid container gap={4} xs={12} lg={7}>
                <p className="title-2">Phiếu nhập kho</p>
                <Grid item lg={9}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Tìm kiếm theo mã đơn hàng"
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
              <Grid container xs={12} gap={4} lg={3.6} justifyContent={'flex-end'}>
                <div className="relative-block">
                  <FormControl>
                    <InputLabel id="select-inventory">Kho</InputLabel>
                    <Select
                      label="Kho"
                      size="small"
                      labelId="select-inventory"
                      value={filterForm.inventoryId}
                      onChange={(e) => handleChangeFilterForm('inventoryId', e.target.value as number)}
                    >
                      {inventories?.map((inventory) => (
                        <MenuItem key={inventory.id} value={inventory?.id}>
                          {inventory.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <Filter onFilter={handleFilter}>
                  <React.Fragment>
                    <SelectField
                      title="Nhân viên tạo"
                      value={filterForm.staffId}
                      options={staffs.map((staff) => ({ value: staff.id, name: staff.name }))}
                      onChange={(value: number) => handleChangeFilterForm('bookingUserId', value)}
                    />
                    <SelectField
                      title="Thanh toán"
                      value={filterForm.paymentType}
                      options={initialPayment?.map((payment) => ({ name: payment.field, value: payment.type }))}
                      onChange={(value: number) => handleChangeFilterForm('payStatus', value)}
                    />
                    <NumberRangeField
                      title="Giá trị đơn"
                      from={filterForm.fromTotal ?? 0}
                      to={filterForm.toTotal ?? 0}
                      onSetRange={(from: number, to: number) => handleSetRange('fromTotal', 'toTotal', from, to)}
                    />
                    <DateTimefield
                      fromTime={getDayjsFormatDate(filterForm?.sellFromTime ?? '')}
                      toTime={getDayjsFormatDate(filterForm?.sellToTime ?? '')}
                      title="Ngày đặt hàng"
                      onSetDate={(fromDate: Dayjs | null, toDate: Dayjs | null) =>
                        handleSetRange('sellFromTime', 'sellToTime', fromDate, toDate)
                      }
                    />
                  </React.Fragment>
                </Filter>
              </Grid>
            </Grid>
            <CustomTable
              className="content-wrapper-table"
              pagination
              metadata={metadata}
              columns={SellingTicketColumn}
              rows={sellingTickets}
              loading={isPendingGetSellingTickets}
              onChangePage={handleChangPage}
            />
          </Box>
        </Box>
      </BaseLayout>
    </div>
  );
};

export default memo(ReceiptProductList);
