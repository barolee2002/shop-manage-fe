import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, InputLabel, FormControl, MenuItem, TextField, Grid } from '@mui/material';
import { Search as SearchIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';

import Select from '@mui/material/Select';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useGetReceiptProductList from 'src/hook/receiptProduct/useGetReceiptProductList';
import { FilterReceipt, ReceiptsType } from 'src/types/ReceiptType';
import { testuser } from 'src/utils/test';
import { metaData } from 'src/types/MetaData';
import Loading from 'src/general/components/Loading';
import useGetInventory from 'src/hook/useGetInventory';
import { useDebounce } from 'src/hook/useDebounce';
import Filter from 'src/general/components/Filter';
import DateTimefield from 'src/general/components/Filter/DateTimefield';
import SelectField from 'src/general/components/Filter/SelectField';
import dayjs, { Dayjs } from 'dayjs';
import { payStatusOptions } from 'src/general/constants/utils.constants';
import NumberRangeField from 'src/general/components/Filter/NumberRangeField';
import { getDayjsFormatDate } from 'src/utils/formatDate';
import 'src/utils/screenBaseStyle/baseScreenStyle.scss';
import CustomTable from 'src/general/components/Table/CustomeTable';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';

import { PATH_INVENTORY_TAKE_CARE } from 'src/general/constants/path';
import useGetUsers from 'src/hook/user/useGetStaff';
import useGetSuppliers from 'src/hook/supplier/useGetSuppliers';
import { FilterStockTakeType, StockTakeType } from 'src/types/stokeTakeTypes';
import useGetStockTakeList from 'src/hook/stockTake/useGetStokeTakeList';
import { StockTakeColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import { updateStockTakeEdit } from '../StockTakeEdit/stockTakeSlice';

const StockTakeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inventories, isPendingGetInventory] = useGetInventory(testuser.storeId);
  const [staffs] = useGetUsers(testuser.storeId);
  const [suppliers] = useGetSuppliers(testuser.storeId);
  const [searchString, setSearchString] = useState<string>('');
  const searchValue = useDebounce(searchString);
  const [stockTakes, setStockTakes] = useState<StockTakeType[]>([]);
  const [getStockTakeList, isPendingGetStockTakeList] = useGetStockTakeList();
  const [metadata, setMetadata] = useState<metaData>({} as metaData);

  const [filterForm, setFilterForm] = useState<FilterStockTakeType>({
    storeId: testuser.storeId,
    inventoryId: testuser.storeId,
    searchString: searchValue,
    status: 2,
  } as FilterStockTakeType);
  const [createActionHistory] = useCreateActionHistory();
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
  const handleChangPage = (_: any, value: number) => {
    handleChangeFilterForm('page', value);
  };
  const handleFetchData = useCallback(() => {
    getStockTakeList({...filterForm, searchString: searchValue})
      .then((res) => {
        setStockTakes(() => {
          return res.data.map((data) => ({ ...data, key: data.id }));
        });
        setMetadata(res.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterForm, getStockTakeList]);
  useEffect(() => {
    createActionHistory({ message: 'Màn hình danh sách phiếu điều chỉnh kho' });
  }, []);
  useEffect(() => {
    handleFetchData();
  }, [filterForm.page, filterForm.inventoryId, searchValue]);
  const handleFilter = () => {
    handleFetchData();
  };
  const handleAddStockTakeTicket = () => {
    dispatch(updateStockTakeEdit({} as StockTakeType));
    navigate(PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_EDIT_PATH, {
      state: {
        pageTitle: 'Quay về trang danh sách phiếu điều chỉnh',
        typeTitle: 'navigate',
        onTitleClick: PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_LIST_PATH,
        typeFeature: 'create',
      },
    });
  };
  return (
    <div className="list">
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle="Danh sách phiếu điều chỉnh kho"
            buttonGroup={[
              {
                buttonTitle: 'Tạo phiếu nhập kho',
                onClick: handleAddStockTakeTicket,
              },
            ]}
          />
        }
      >
        <Box className="content">
          <Box className="content-wrapper">
            <Grid container wrap="wrap" gap={4} className="content-wrapper-search">
              <Grid container gap={4} xs={12} lg={7}>
                <p className="title-2">Phiếu kiểm kho</p>
                <Grid lg={9}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Tìm kiếm theo mã phiếu"
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
                  {isPendingGetInventory ? (
                    <Loading isLoading={isPendingGetInventory} />
                  ) : (
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
                  )}
                </div>
                <Filter onFilter={handleFilter}>
                  <React.Fragment>
                    <SelectField
                      title="Nhân viên tạo"
                      value={filterForm.createUser}
                      options={staffs.map((staff) => ({ value: staff.id, name: staff.name }))}
                      onChange={(value: number) => handleChangeFilterForm('createUser', value)}
                    />
                    <SelectField
                      title="Nhân viên tạo xác nhận"
                      value={filterForm.confirmUser}
                      options={staffs.map((staff) => ({ value: staff.id, name: staff.name }))}
                      onChange={(value: number) => handleChangeFilterForm('confirmUser', value)}
                    />
                    <SelectField
                      title="Trạng thái đơn"
                      value={filterForm.status}
                      options={payStatusOptions}
                      onChange={(value: number) => handleChangeFilterForm('status', value)}
                    />
                    <DateTimefield
                      fromTime={getDayjsFormatDate(filterForm.createFromTime)}
                      toTime={getDayjsFormatDate(filterForm.createToTime)}
                      title="Ngày tạo phiếu"
                      onSetDate={(fromDate: Dayjs | null, toDate: Dayjs | null) =>
                        handleSetRange('createFromTime', 'createToTime', fromDate, toDate)
                      }
                    />
                    <DateTimefield
                      fromTime={getDayjsFormatDate(filterForm.updateFromTime)}
                      toTime={getDayjsFormatDate(filterForm.updateToTime)}
                      title="Ngày xác nhận"
                      onSetDate={(fromDate: Dayjs | null, toDate: Dayjs | null) =>
                        handleSetRange('updateFromTime', 'updateToTime', fromDate, toDate)
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
              columns={StockTakeColumn}
              rows={stockTakes}
              loading={isPendingGetStockTakeList}
              onChangePage={handleChangPage}
            />
          </Box>
        </Box>
      </BaseLayout>
    </div>
  );
};

export default memo(StockTakeList);
