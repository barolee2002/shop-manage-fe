/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/named */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from 'src/api/axiosClient';
import { BaseLayout } from 'src/general/components/BaseLayout';
import { Box, InputLabel, FormControl, MenuItem, TextField, IconButton, Snackbar, Alert } from '@mui/material';
import { productSelector } from 'src/redux/selector';
import InputAdornment from '@mui/material/InputAdornment';
import { Search as SearchIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material';
import { changeProduct, updateProduct } from './ProductSlice';
import { useDispatch } from 'react-redux';
import { Dayjs } from 'dayjs';
import { metaData } from 'src/types/MetaData';
import { ProductAttributeType, ProductType } from 'src/types/Product';
import { useNavigate } from 'react-router';
import { useDebounce } from 'src/hook/useDebounce';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import ColabTable from 'src/general/components/Table/ColabTable';
import SubTable from 'src/general/components/Table/ColabTable/SubTable';
import OnceRow from 'src/general/components/Table/Product/OnceRow';
import ColabRow from 'src/general/components/Table/Product/ColabRow';
import UpdateProductModal from 'src/general/components/Modal/UpdateProductModal';
import { productColumns, productSubColumns } from 'src/general/components/Table/TableColumn/TableColumns';
import useUploadImage from 'src/hook/upLoadImage';
import AttributeModal from 'src/general/components/Modal/AttributeModal';
import Filter from 'src/general/components/Filter';
import DateTimeField from 'src/general/components/Filter/DateTimefield';
import SelectField from 'src/general/components/Filter/SelectField';
import Select from '@mui/material/Select';
import { testuser } from 'src/utils/test';
import useGetInventory from 'src/hook/useGetInventory';
import useGetCategory from 'src/hook/useGetCategory';
import { PATH_PRODUCT } from 'src/general/constants/path';
import { updateProductEdit } from '../ProductCreating/productEditSlice';
import Loading from 'src/general/components/Loading';
import 'src/utils/screenBaseStyle/baseScreenStyle.scss';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';


export default function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(productSelector);
  const [categories] = useGetCategory(testuser.storeId);
  const [category, setCategory] = useState('');
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const [inventory, setInventory] = useState(testuser.storeId);
  const [searchString, setSearchString] = useState('');
  const [show, setShow] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadImage] = useUploadImage();
  const [editAttribute, setEditAttribute] = useState<ProductAttributeType>({} as ProductAttributeType);
  const [image, setImage] = useState<File | null>(null);
  const [inventories, isPendingGetInventory] = useGetInventory(testuser.storeId);
  const [editProduct, setEditProduct] = useState<ProductType>({} as ProductType);
  const debounceString = useDebounce(searchString, 500);
  const [fromTime, setFromTime] = useState<Dayjs | null>(null);
  const [toTime, setToTime] = useState<Dayjs | null>(null);
  const [page, setPage] = useState(1);
  const handleCloseMOdal = () => {
    setShow('');
    setEditProduct({} as ProductType);
    setEditAttribute({} as ProductAttributeType);
  };
  const handleChangeProduct = (title: string, value: any) => {
    setEditProduct((prev) => {
      return {
        ...prev,
        [title]: value,
      };
    });
  };
  const handleChangeEditAttribute = (title: string, value: any) => {
    setEditAttribute((prev) => {
      return {
        ...prev,
        [title]: value,
      };
    });
  };
  const handleChangeAttribute = (attributeId: number, title: string, value: any) => {
    setEditProduct((prev) => {
      return {
        ...prev,
        attributes: prev.attributes.map((attribute) => {
          return attribute.id === attributeId
            ? {
                ...attribute,
                [title]: value,
              }
            : attribute;
        }),
      };
    });
  };
  const fetchData = async () => {
    setLoading(true);
    const fromDate =
      fromTime !== null
        ? `${fromTime.toDate().getFullYear()}-${fromTime.toDate().getMonth() + 1}-${fromTime.toDate().getDate()}`
        : null;
    const toDate =
      toTime !== null
        ? `${toTime.toDate().getFullYear()}-${toTime.toDate().getMonth() + 1}-${toTime.toDate().getDate()}`
        : null;
    try {
      // const fromDate =
      const response = await axiosClient.get(`product/all`, {
        params: {
          storeId: testuser.storeId,
          searchString: searchString,
          category: category,
          page: page,
          inventoryId: inventory,
          fromTime: fromDate,
          toTime: toDate,
        },
      });

      setMetadata(response.data.metaData);
      page > response.data.totalPages && setPage(1);
      dispatch(updateProduct(response.data.data));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [page, debounceString, inventory]);
  const handleUpdateProduct = async () => {
    try {
      const link = image !== null ? await uploadImage(image) : null;
      if (image !== null && link === null) {
        throw new Error('loi tai anh');
      }
      handleChangeProduct('imageLink', link);
      await axiosClient.put(`product/updating/${editProduct.id}`, { ...editProduct, imageLink: link });
      dispatch(changeProduct({ ...editProduct, imageLink: link }));
      setShow('');
      dispatch(openAlert({ message: 'Cập nhập sẩn phẩm thành công', type: 'success' }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateAttribute = async () => {
    try {
      const link = image !== null ? await uploadImage(image) : null;
      if (image !== null && link === null) {
        console.log('loivailol');

        throw new Error('fail to upload image');
      }
      handleChangeProduct('imageLink', link);
      await axiosClient.put(`product-attributes/updating/${editAttribute.id}`, { ...editAttribute, imageLink: link });
      // dispatch(changeProduct({ ...editProduct, imageLink: link }));
      setShow('');
      dispatch(openAlert({ message: 'Cập nhập sẩn phẩm thành công', type: 'success' }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleFilter = () => {
    fetchData();
  };
  const handleChangPage = (_: any, value: number) => {
    setPage(value);
  };
  const handleOpenEditModal = (item: ProductType) => {
    setShow('product');
    setEditProduct(item);
  };
  const handleOpenEditAttributeModal = (item: ProductAttributeType) => {
    setShow('attribute');
    setEditAttribute(item);
  };
  const handleSetDate = React.useCallback((fromTime: Dayjs | null, toTime: Dayjs | null) => {
    setFromTime(fromTime);
    setToTime(toTime);
  }, []);
  console.log(fromTime, toTime);

  const handleAddProduct = () => {
    dispatch(updateProductEdit({} as ProductType));
    navigate(PATH_PRODUCT.PRODUCT_CREATE_PATH, {
      state: {
        pageTitle: 'Quay về trang danh sách sản phẩm',
        typeTitle: 'navigate',
        onTitleClick: PATH_PRODUCT.PRODUCT_LIST_PATH,
        typeFeature: 'create',
      },
    });
  };
  return (
    <div className="list">
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle="Danh sách sản phẩm"
            buttonGroup={[{ buttonTitle: 'Thêm sản phẩm', onClick: handleAddProduct }]}
          />
        }
      >
        <Box className="content">
          <Box className="content-wrapper">
            <Box className="content-wrapper-search">
              <div className="search-result">
                <TextField
                  fullWidth
                  size="small"
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
              </div>
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
                      value={inventory}
                      onChange={(e) => setInventory(e.target.value as number)}
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
                  <DateTimeField fromTime={fromTime} toTime={toTime} title="Ngày tạo" onSetDate={handleSetDate} />
                  <SelectField
                    value={category}
                    title="Loại sản phẩm"
                    options={categories.map((category) => ({ value: category, name: category }))}
                    onChange={setCategory}
                  />
                </React.Fragment>
              </Filter>
            </Box>
            <ColabTable
              columns={[
                ...productColumns,
                {
                  field: '',
                  headerName: '',
                  headerClassName: 'content-wrapper-table-header',
                  flex: 1,
                  renderCell: (item: ProductType) => (
                    <React.Fragment>
                      <IconButton onClick={() => handleOpenEditModal(item)}>
                        <ModeEditIcon color="primary" />
                      </IconButton>
                    </React.Fragment>
                  ),
                },
              ]}
              rows={products.map((product, index) => {
                return {
                  ...product,
                  subTableRow: product.attributes,
                  key: (page - 1) * 10 + index + 1,
                };
              })}
              metadata={metadata}
              onceRow={(...rest: any) => <OnceRow {...rest} />}
              colabRow={(...rest: any) => <ColabRow {...rest} />}
              onChangePage={handleChangPage}
              pagination
              loading={loading}
              className="content-wrapper-table"
              subTable={(subItem: ProductType) => (
                <SubTable
                  pagination={false}
                  pageTitle="Hàng hóa tương tự"
                  columns={[
                    ...productSubColumns,
                    {
                      field: '',
                      headerName: '',
                      headerClassName: 'content-wrapper-table-header',
                      flex: 1,
                      renderCell: (item: ProductAttributeType) => (
                        <React.Fragment>
                          <IconButton
                            onClick={() => {
                              handleOpenEditAttributeModal(item);
                            }}
                          >
                            <ModeEditIcon color="primary" />
                          </IconButton>
                        </React.Fragment>
                      ),
                    },
                  ]}
                  rows={subItem.attributes?.map((attribute) => {
                    return { ...attribute, key: attribute.id, productName: subItem.name };
                  })}
                />
              )}
            />
          </Box>
          <UpdateProductModal
            detail={editProduct}
            open={show === 'product'}
            categories={categories}
            onImage={setImage}
            onUpdate={handleUpdateProduct}
            onClose={handleCloseMOdal}
            onChangeProductDetail={handleChangeProduct}
            onChangeAttribute={handleChangeAttribute}
          />
          <AttributeModal
            detail={editAttribute}
            open={show === 'attribute'}
            onUpdate={handleUpdateAttribute}
            onImage={setImage}
            onClose={handleCloseMOdal}
            onChangeAttribute={handleChangeEditAttribute}
          />
        </Box>
      </BaseLayout>
    </div>
  );
}
