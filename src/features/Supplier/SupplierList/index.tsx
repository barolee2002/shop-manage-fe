import React, { memo, useEffect, useState } from 'react';
import { Box, TextField, Grid, IconButton } from '@mui/material';
import { Search as SearchIcon, ModeEdit as ModeEditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import { useDebounce } from 'src/hook/useDebounce';
import Filter from 'src/general/components/Filter';
import NumberRangeField from 'src/general/components/Filter/NumberRangeField';
import 'src/utils/screenBaseStyle/baseScreenStyle.scss';
import CustomTable from 'src/general/components/Table/CustomeTable';

import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import { userModelSelector } from 'src/redux/selector';
import { useSelector } from 'react-redux';
import useGetSupplierPage from 'src/hook/supplier/useGetSupplierPage';
import { SupplierFilter, SupplierType } from 'src/types/supplier.type';
import { SupplierColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import useDeleteSupplier from 'src/hook/supplier/useDeleteSupplier';
import { useDispatch } from 'react-redux';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';
import useCreateSupplier from 'src/hook/supplier/useCreateSupplier';
import useUpdateSupplier from 'src/hook/supplier/useUpdateSupplier';
import SupplierModal from 'src/general/components/Modal/SupplierModal';

const SupplierPage = () => {
  const dispatch = useDispatch();
  const userModel = useSelector(userModelSelector);
  const { supplierPage, metadata, isPendingSupplierPage, reFetchSupplierPage } = useGetSupplierPage(userModel.storeId);
  const [createActionHistory] = useCreateActionHistory();
  const [searchString, setSearchString] = useState<string>('');
  const searchValue = useDebounce(searchString);
  const { createSupplier, isPendingCreateSupplier } = useCreateSupplier(userModel.storeId);
  const { updateSupplier, isPendingUpdateSupplier } = useUpdateSupplier(userModel.storeId);
  const { deleteSupplier, isDeleteSupplier } = useDeleteSupplier();
  const [show, setShow] = useState('');
  const [supplierEdit, setSupplierEdit] = useState<SupplierType>({} as SupplierType);
  const [filterForm, setFilterForm] = useState<SupplierFilter>({
    storeId: userModel.storeId,
    searchString: searchValue,
  } as SupplierFilter);
  const handleCloseMOdal = () => {
    setShow('');
    setSupplierEdit({} as SupplierType);
  };
  const handleChangeSupplier = (title: string, value: any) => {
    setSupplierEdit((prev) => ({
      ...prev,
      [title]: value,
    }));
  };
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

  const handleFetchData = () => {
    reFetchSupplierPage(filterForm).catch((err) => {
      console.log(err);
    });
  };
  useEffect(() => {
    createActionHistory({ message: 'Màn hình danh sách nhà cung cấp' });
  }, []);
  useEffect(() => {
    handleFetchData();
  }, [filterForm.page, searchValue]);
  const handleFilter = () => {
    handleFetchData();
  };
  const handleChangPage = (_: any, value: number) => {
    handleChangeFilterForm('page', value);
  };
  const handleOpenEditModal = (supplier: SupplierType) => {
    setShow('edit');
    setSupplierEdit(supplier);
  };
  const handleOpenAddModal = () => {
    setShow('add');
    setSupplierEdit({} as SupplierType);
  };
  const handleDeleteSupplier = (id: number) => {
    deleteSupplier(id)
      .then(() => {
        dispatch(openAlert({ message: 'Xóa nhà cung cấp thành công', type: 'success' }));
        reFetchSupplierPage({
          storeId: userModel.storeId,
          searchString: searchValue,
        } as SupplierFilter);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handeAddSupplier = () => {
    createSupplier(supplierEdit)
      .then((res) => {
        dispatch(openAlert({ message: 'Tạo nhà cung cấp thành công', type: 'success' }));
        reFetchSupplierPage({
          storeId: userModel.storeId,
          searchString: searchValue,
        } as SupplierFilter);
        handleCloseMOdal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handeUpdateSupplier = () => {
    updateSupplier(supplierEdit)
      .then((res) => {
        dispatch(openAlert({ message: 'Tạo nhà cung cấp thành công', type: 'success' }));
        reFetchSupplierPage({
          storeId: userModel.storeId,
          searchString: searchValue,
        } as SupplierFilter);
        handleCloseMOdal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="list">
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle="Danh sách đơn nhập kho"
            buttonGroup={[{ buttonTitle: 'Thêm nhà cung cấp', onClick: handleOpenAddModal }]}
          />
        }
      >
        <Box className="content">
          <Box className="content-wrapper">
            <Grid container wrap="wrap" gap={4} className="content-wrapper-search">
              <Grid container gap={4} xs={12} lg={7}>
                <p className="title-2">Nhà cung cấp</p>
                <Grid item lg={9}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Tìm kiếm theo tên nhà cung cấp"
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
                <Filter onFilter={handleFilter}>
                  <React.Fragment>
                    <NumberRangeField
                      title="Nợ"
                      from={Number(filterForm.fromTotal)}
                      to={Number(filterForm.toTotal)}
                      onSetRange={(from: number, to: number) => handleSetRange('fromTotal', 'toTotal', from, to)}
                    />
                  </React.Fragment>
                </Filter>
              </Grid>
            </Grid>
            <CustomTable
              className="content-wrapper-table"
              pagination
              metadata={metadata}
              columns={[
                ...SupplierColumn,
                {
                  field: '',
                  headerName: '',
                  headerClassName: 'content-wrapper-table-header',
                  flex: 1,
                  renderCell: (item: SupplierType) => (
                    <React.Fragment>
                      <IconButton onClick={() => handleOpenEditModal(item)}>
                        <ModeEditIcon color="primary" />
                      </IconButton>
                      <IconButton disabled={isDeleteSupplier} onClick={() => handleDeleteSupplier(item.id)}>
                        <DeleteIcon color="primary" />
                      </IconButton>
                    </React.Fragment>
                  ),
                },
              ]}
              rows={supplierPage?.map((supplier) => ({ ...supplier, key: supplier.id }))}
              loading={isPendingSupplierPage}
              onChangePage={handleChangPage}
            />
          </Box>
          <SupplierModal
            open={show === 'add'}
            onChangeSupplier={handleChangeSupplier}
            supplier={supplierEdit}
            onClose={handleCloseMOdal}
            onConfirm={handeAddSupplier}
          />
          <SupplierModal
            open={show === 'edit'}
            onChangeSupplier={handleChangeSupplier}
            supplier={supplierEdit}
            onClose={handleCloseMOdal}
            onConfirm={handeUpdateSupplier}
          />
        </Box>
      </BaseLayout>
    </div>
  );
};

export default memo(SupplierPage);
