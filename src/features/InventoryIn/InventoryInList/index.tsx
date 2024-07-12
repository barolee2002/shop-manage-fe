import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, InputLabel, FormControl, MenuItem, TextField, Grid } from '@mui/material';
import { Search as SearchIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useGetReceiptProductList from 'src/hook/receiptProduct/useGetReceiptProductList';
import { FilterReceipt, ReceiptsType } from 'src/types/ReceiptType';
import { metaData } from 'src/types/MetaData';
import { useDebounce } from 'src/hook/useDebounce';
import Filter from 'src/general/components/Filter';
import DateTimefield from 'src/general/components/Filter/DateTimefield';
import SelectField from 'src/general/components/Filter/SelectField';
import { Dayjs } from 'dayjs';
import useGetUsers from 'src/hook/user/useGetStaff';
import useGetSuppliers from 'src/hook/supplier/useGetSuppliers';
import { payStatusOptions, receiptOptions } from 'src/general/constants/utils.constants';
import NumberRangeField from 'src/general/components/Filter/NumberRangeField';
import { getDayjsFormatDate } from 'src/utils/formatDate';
import 'src/utils/screenBaseStyle/baseScreenStyle.scss';
import CustomTable from 'src/general/components/Table/CustomeTable';
import { InventoryInColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import { useSelector } from 'react-redux';
import { inventorySelector, userModelSelector } from 'src/redux/selector';

const ReceiptInventoryInList = () => {
  const userModel = useSelector(userModelSelector);
  const [getReceiptList, isPendingGetReceiptProductList] = useGetReceiptProductList();
  const inventories = useSelector(inventorySelector);
  const [createActionHistory] = useCreateActionHistory();
  const { staffs } = useGetUsers(userModel.storeId);
  const [suppliers] = useGetSuppliers(userModel.storeId);
  const [searchString, setSearchString] = useState<string>('');
  const searchValue = useDebounce(searchString);
  const [filterForm, setFilterForm] = useState<FilterReceipt>({
    storeId: userModel.storeId,
    inventoryId: inventories[0].id,
    searchString: searchValue,
  } as FilterReceipt);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const [receripts, setReceipts] = useState<ReceiptsType[]>([]);
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
    getReceiptList(filterForm)
      .then((res) => {
        setReceipts(() => {
          return res.data.map((data) => ({ ...data, key: data.id }));
        });
        setMetadata(res.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterForm, getReceiptList]);
  useEffect(() => {
    createActionHistory({ message: 'Màn hình danh sách đơn đặt hàng' });
  }, []);
  useEffect(() => {
    handleFetchData();
  }, [filterForm.page, filterForm.inventoryId]);
  const handleFilter = () => {
    handleFetchData();
  };
  const handleChangPage = (_: any, value: number) => {
    handleChangeFilterForm('page', value);
  };
  return (
    <div className="list">
      <BaseLayout topbarChildren={<CustomeTopbar pageTitle="Danh sách đơn hàng nhập kho" />}>
        <Box className="content">
          <Box className="content-wrapper">
            <Grid wrap="wrap" gap={4} className="content-wrapper-search">
              <Grid container gap={4} xs={12} lg={7}>
                <p className="title-2">Phiếu nhập kho</p>
                <Grid lg={9}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
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
                      title="Nhân viên nhập kho"
                      value={filterForm.confirmUserId}
                      options={staffs.map((staff) => ({ value: staff.id, name: staff.name }))}
                      onChange={(value: number) => handleChangeFilterForm('confirmUserId', value)}
                    />
                    <SelectField
                      title="Thanh toán"
                      value={filterForm.payStatus}
                      options={payStatusOptions}
                      onChange={(value: number) => handleChangeFilterForm('payStatus', value)}
                    />
                    <SelectField
                      title="Nhập kho"
                      value={filterForm.receiptStatus}
                      options={receiptOptions}
                      onChange={(value: number) => handleChangeFilterForm('receiptStatus', value)}
                    />
                    <SelectField
                      title="Nhà cung cấp"
                      value={filterForm.supplierId}
                      options={suppliers.map((supplier) => ({ value: supplier.id, name: supplier.name }))}
                      onChange={(value: number) => handleChangeFilterForm('confirmUserId', value)}
                    />
                  </React.Fragment>
                </Filter>
              </Grid>
            </Grid>
            <CustomTable
              className="content-wrapper-table"
              pagination
              metadata={metadata}
              columns={InventoryInColumn}
              rows={receripts}
              loading={isPendingGetReceiptProductList}
              onChangePage={handleChangPage}
            />
          </Box>
        </Box>
      </BaseLayout>
    </div>
  );
};

export default memo(ReceiptInventoryInList);
