import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, InputLabel, FormControl, MenuItem, TextField, Grid, Tabs, Tab, Divider } from '@mui/material';
import { Search as SearchIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';

import Select from '@mui/material/Select';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import { metaData } from 'src/types/MetaData';
import { useDebounce } from 'src/hook/useDebounce';
import useGetUsers from 'src/hook/user/useGetStaff';
import 'src/utils/screenBaseStyle/baseScreenStyle.scss';
import CustomTable from 'src/general/components/Table/CustomeTable';
import {  StockManagementColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import { inventorySelector, userModelSelector } from 'src/redux/selector';
import { useSelector } from 'react-redux';
import './StockManament.styles.scss';
import { StockManagementFilter, StockProductManagerment } from 'src/types/stokeManagement.type';
import useGetStockManagement from 'src/hook/stockManagement/useGetStockManagement';
import { stockManagementTime } from 'src/general/constants/utils.constants';
import InventoryModal from 'src/general/components/Modal/AddStockModal';
import { inventoryType } from 'src/types/inventory';
import useCreateInventory from 'src/hook/inventory/useCreateInventory';
import Loading from 'src/general/components/Loading';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';
import useGetInventory from 'src/hook/inventory/useGetInventory';

const StockManagement = () => {
  const dispatch = useDispatch();
  const userModel = useSelector(userModelSelector);
  const inventories = useSelector(inventorySelector);
  const { getStockManagement, isPendingGetStockManagement } = useGetStockManagement();
  const [createActionHistory] = useCreateActionHistory();
  const [searchString, setSearchString] = useState<string>('');
  const searchValue = useDebounce(searchString);
  const [filterForm, setFilterForm] = useState<StockManagementFilter>({
    inventoryId: inventories[0]?.id,
    searchString: searchValue,
  } as StockManagementFilter);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const [stockManagement, setStockManagement] = useState<StockProductManagerment[]>([]);
  const [time, setTime] = useState<string>('ALL');
  const [dangerQuantity, setDangerQuantity] = useState<number>(10);
  const { getInventories } = useGetInventory();
  const [tabValue, setTabValue] = React.useState<string>('all');
  const [show, setShow] = useState<string>('');
  const [inventoryEdit, setInventoryEdit] = useState<inventoryType>({} as inventoryType);
  const { createInventory, isPendingCreateInventory } = useCreateInventory(userModel.storeId);
  const handleCloseMOdal = () => {
    setShow('');
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const handleChangeFilterForm = (title: string, value: any) => {
    setFilterForm(
      () =>
        ({
          inventoryId: inventories[0]?.id,
          searchString: searchValue,
        }) as StockManagementFilter
    );
    setFilterForm((prev) => ({
      ...prev,
      [title]: value,
    }));
  };
  const handleAddInventory = () => {
    createInventory(inventoryEdit).then(() => {
      handleCloseMOdal();
      dispatch(openAlert({ message: 'Tạo kho mới thành công', type: 'success' }));
      getInventories(userModel.storeId)
    });
  };
  const handleInventoryEdit = (title: string, value: any) => {
    setInventoryEdit((prev) => ({
      ...prev,
      [title]: value,
    }));
  };
  const handleFetchData = () => {
    getStockManagement(filterForm)
      .then((res) => {
        setStockManagement(() => {
          return res.data.map((data) => ({ ...data, key: data.id }));
        });
        setMetadata(res.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    createActionHistory({ message: 'Màn hình quản lí kho' });
  }, []);
  useEffect(() => {
    handleFetchData();
  }, [
    filterForm.page,
    filterForm.minQuantity,
    filterForm.time,
    filterForm.quantity,
    filterForm.inventoryId,
    time,
    dangerQuantity,
    searchValue,
    inventories,
  ]);
  const handleChangPage = (_: any, value: number) => {
    handleChangeFilterForm('page', value);
  };

  const totalQuantity = useMemo(() => {
    return stockManagement?.reduce((response, stock) => {
      return (response = response + stock.quantity);
    }, 0);
  }, [stockManagement]);
  const totalCost = useMemo(() => {
    return stockManagement?.reduce((response, stock) => {
      return (response = response + stock.costPrice * stock.quantity);
    }, 0);
  }, [stockManagement]);
  const totalSell = useMemo(() => {
    return stockManagement?.reduce((response, stock) => {
      return (response = response + stock.sellPrice * stock.quantity);
    }, 0);
  }, [stockManagement]);
  const handleAddStock = () => {
    setInventoryEdit({} as inventoryType);
    setShow('inventory');
  };
  return (
    <div className="list">
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle="Quản lí kho hàng"
            buttonGroup={[{ buttonTitle: 'Tạo kho', onClick: handleAddStock }]}
          />
        }
      >
        <Box className="content stock-management">
          {isPendingCreateInventory && <Loading isLoading={isPendingCreateInventory} size={50} />}
          <Grid container xs={12}>
            <Grid item xs={12} lg={2} className="content-wrapper stock-management-options">
              <Tabs
                value={tabValue}
                onChange={handleChange}
                orientation="vertical"
                variant="scrollable"
                scrollButtons={false}
                aria-label="scrollable prevent tabs example"
              >
                <Tab value="all" onClick={() => handleChangeFilterForm('', '')} label="Tất cả" />
                <Tab
                  value="minQuantity"
                  onClick={() => handleChangeFilterForm('minQuantity', 1)}
                  label="Hàng còn trong kho"
                />
                <Tab value="time" onClick={() => handleChangeFilterForm('time', time)} label="Tồn kho lâu" />
                <Tab value="empty" onClick={() => handleChangeFilterForm('quantity', 0)} label="Hết hàng" />
                <Tab
                  value="danger"
                  onClick={() => handleChangeFilterForm('quantity', dangerQuantity)}
                  label="Sắp hết hàng"
                />
              </Tabs>
            </Grid>
            <Grid item xs={12} lg={10} className="content-wrapper">
              <Grid container wrap="wrap" gap={4} className="content-wrapper-search">
                <Grid container gap={4} xs={12} lg={6}>
                  <p className="title-2">Hàng hóa</p>
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

                <Grid container xs={12} gap={1} lg={3.6} justifyContent={'flex-end'}>
                  {tabValue === 'time' && (
                    <FormControl>
                      <InputLabel id="select-inventory">Thời gian tồn kho</InputLabel>
                      <Select
                        label="Kho"
                        size="small"
                        labelId="select-inventory"
                        value={time}
                        onChange={(e) => {
                          setTime(e.target.value);
                          handleChangeFilterForm('time', e.target.value);
                        }}
                      >
                        {stockManagementTime?.map((time) => (
                          <MenuItem key={time.value} value={time?.value}>
                            {time.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
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
                </Grid>
              </Grid>
              <Grid>
                <CustomTable
                  className="content-wrapper-table"
                  pagination
                  metadata={metadata}
                  columns={StockManagementColumn}
                  rows={stockManagement}
                  loading={isPendingGetStockManagement}
                  onChangePage={handleChangPage}
                />
                <Grid className="mt12" xs={12} gap={1}>
                  <p className="text-start">
                    Tổng tồn kho: <span>{totalQuantity?.toLocaleString()}</span>
                  </p>
                  <Grid className="mt12" container gap={2} xs={12}>
                    <p className="cost-total">
                      Vốn tồn kho : <span>{totalCost?.toLocaleString()} đ</span>
                    </p>
                    <p className="sell-total">
                      Giá trị tồn: <span>{totalSell?.toLocaleString()} đ</span>
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </BaseLayout>
      <InventoryModal
        inventory={inventoryEdit}
        open={show === 'inventory'}
        onChangeInventory={handleInventoryEdit}
        onClose={handleCloseMOdal}
        onConfirm={handleAddInventory}
      />
    </div>
  );
};

export default memo(StockManagement);
