import { Box, Grid, TextField, MenuItem, InputAdornment, IconButton } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useGetSuppliers from 'src/hook/supplier/useGetSuppliers';
import useGetUsers from 'src/hook/user/useGetStaff';
import { NumericFormat } from 'react-number-format';
import { inventorySelector, receiptEditSelector, userModelSelector } from 'src/redux/selector';
import './ReceiptProductCreating.style.scss';
import {
  addProductReceiptEdit,
  changeReceiptProductEdit,
  changeValueEditReceipt,
  updateReceiptEdit,
} from './receiptSlice';
import SelectField from 'src/general/components/Filter/SelectField';
import { initialReceipt, initialReceiptProduct, initialSupplier } from 'src/utils/initialValue';
import { formatPhoneNumber } from 'src/utils/phoneFormat';
import DateField from 'src/general/components/Filter/DateField';
import { getDayjsFormatDate } from 'src/utils/formatDate';
import dayjs from 'dayjs';
import { useDebounce } from 'src/hook/useDebounce';
import useGetProductList from 'src/hook/product/useGetProductsList';
import { FilterProductType, ProductAttributeType, ProductList } from 'src/types/Product';
import SearchProductDropdown from 'src/general/components/SearchProductDropdown';
import { getFlatAttribute } from 'src/utils/getFlatAttribute';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import useCreateReceipt from 'src/hook/receiptProduct/useCreateReceipt';
import { PATH_RECEIPT_PRODUCT } from 'src/general/constants/path';

const ReceiptCreating = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = dayjs();
  const inventories = useSelector(inventorySelector);
  const userModel = useSelector(userModelSelector);
  const { pageTitle, typeTitle, onTitleClick, typeFeature } = location.state;
  const receiptEdit = useSelector(receiptEditSelector);
  const [createActionHistory] = useCreateActionHistory();
  const [getProductList] = useGetProductList();
  const [createReceipt, isPendingCreateReceipt] = useCreateReceipt();
  const { staffs } = useGetUsers(userModel.storeId);
  const [searchString, setSearchString] = useState<string>('');
  const [searchResult, setSearchResult] = useState<ProductList>({} as ProductList);
  const searchValue = useDebounce(searchString);
  const render = useRef(true);
  const [suppliers] = useGetSuppliers(userModel.storeId);

  const handleBackPage = useCallback(() => {
    navigate(`${onTitleClick}`);
  }, [onTitleClick]);
  useEffect(() => {
    if (Object.keys(receiptEdit).length === 0 && receiptEdit.constructor === Object) {
      dispatch(updateReceiptEdit({ ...initialReceipt, storeId: userModel.id }));
    }
  }, [receiptEdit]);
  useEffect(() => {
    handleSearchProduct();
  }, [searchValue]);
  useEffect(() => {
    if (render.current) {
      createActionHistory({ message: 'Màn hình tạo đơn đặt hàng' });
    }
    render.current = false;
  });
  const handleSearchProduct = () => {
    getProductList({
      storeId: userModel.storeId,
      searchString: searchValue,
      inventoryId: receiptEdit?.inventory?.id,
    } as FilterProductType).then((res) => {
      setSearchResult(res);
    });
  };
  const dataPost = useMemo(() => {
    return {
      ...receiptEdit,
      products: receiptEdit?.products?.filter((product) => product.cost && product.quantity),
      total: receiptEdit?.products?.reduce((total, product) => {
        total = total + product.cost * product.quantity;
        return total;
      }, 0),
    };
  }, [receiptEdit]);
  const handleCreateReceipt = () => {
    createReceipt(dataPost)
      .then((res) => {
        dispatch(openAlert({ message: 'Tạo đơn đặt hàng thành công', type: 'success' }));
        navigate(PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_DETAIL_PATH.replace(':id', String(res.id)));
      })
      .catch((err) => {
        dispatch(openAlert({ message: `Tạo đơn đặt hàng thất bại,\n vui lòng thử lại sau`, type: 'error' }));
      });
  };
  const handleChangeSupplier = (id: number) => {
    const selectSupplier = suppliers.find((supplier) => supplier.id === id);
    dispatch(changeValueEditReceipt({ supplier: selectSupplier }));
  };
  const handleChangeStaff = (id: number) => {
    const selectStaff = staffs.find((staff) => staff.id === id);
    dispatch(changeValueEditReceipt({ bookingUser: selectStaff }));
  };
  const handleChangeInventory = (id: number) => {
    const selectInventory = inventories.find((inventory) => inventory.id === id);
    dispatch(changeValueEditReceipt({ inventory: selectInventory }));
  };
  const handleUpdateReceipt = () => {};
  const handleChooseProduct = (attribute: ProductAttributeType) => {
    if (!receiptEdit.products.filter((product) => product.productAttribute.id !== attribute.id)) {
      dispatch(openAlert({ message: 'Sản phẩm đã sẵn sàng trong danh sách', type: 'error' }));
    } else {
      dispatch(addProductReceiptEdit({ ...initialReceiptProduct, productAttribute: attribute }));
    }
  };
  const handleChangeReceiptProduct = (index: number, key: string, value: any) => {
    dispatch(
      changeReceiptProductEdit({
        index: index,
        field: {
          [key]: value,
        },
      })
    );
  };
  return (
    <BaseLayout
      topbarChildren={
        <CustomeTopbar
          pageTitle={pageTitle ? pageTitle : 'Chi tiết đơn hàng'}
          typeTitle={typeTitle ? typeTitle : 'text'}
          onTitleClick={handleBackPage}
          buttonGroup={
            typeFeature === 'create'
              ? [
                  { buttonTitle: 'Hủy', onClick: handleBackPage, color: 'error' },
                  {
                    buttonTitle: 'Tạo đơn hàng',
                    onClick: handleCreateReceipt,
                    disable: isPendingCreateReceipt,
                  },
                ]
              : [
                  { buttonTitle: 'Hủy', onClick: handleBackPage, color: 'error' },
                  {
                    buttonTitle: 'Cập nhập đơn hàng',
                    onClick: handleUpdateReceipt,
                  },
                ]
          }
        />
      }
    >
      <Box className="content">
        <Grid container wrap="wrap" className="base-info" justifyContent={'space-between'}>
          <Grid className="base-info-item" xs={12} md={8}>
            <TextField
              label="Mã phiếu"
              value={receiptEdit?.code}
              onChange={(e) => dispatch(changeValueEditReceipt({ code: e.target.value }))}
            />
            <SelectField
              title="Nhà cung cấp"
              value={receiptEdit?.supplier?.id}
              options={suppliers.map((supplier) => ({ value: supplier.id, name: supplier.name }))}
              onChange={(value: number) => {
                handleChangeSupplier(value);
              }}
              initialValue={initialSupplier}
            />
            <Grid xs={12} md={6} container gap={1}>
              <Grid container justifyContent={'space-between'}>
                <p>Địa chỉ</p>
                <p className="w70">: {receiptEdit.supplier?.address}</p>
              </Grid>
              <Grid container justifyContent={'space-between'}>
                <p>Số điện thoại</p>
                <p className="w70">: {formatPhoneNumber(receiptEdit.supplier?.phone) ?? ''}</p>
              </Grid>
              <Grid container justifyContent={'space-between'}>
                <p>Số tiền nợ</p>
                <p className="w70">
                  : {receiptEdit.supplier?.deptMoney ? receiptEdit.supplier?.deptMoney.toLocaleString() : null} đ
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="base-info-item" xs={12} md={3.8}>
            <SelectField
              title="Kho"
              value={receiptEdit?.inventory?.id}
              options={inventories.map((inventory) => ({ value: inventory.id, name: inventory.name }))}
              onChange={(value: number) => handleChangeInventory(value)}
              initialValue={initialSupplier}
            />
            <SelectField
              title="Nhân viên tạo"
              disable={true}
              value={userModel.id}
              options={staffs.map((staff) => ({ value: staff.id, name: staff?.name }))}
              onChange={(value: number) => handleChangeStaff(value)}
              initialValue={initialSupplier}
            />
            <DateField
              title="Ngày đặt hàng"
              date={receiptEdit.bookingDate ? getDayjsFormatDate(receiptEdit.bookingDate) : current}
            />
          </Grid>
        </Grid>
        <Box className="products-info">
          <SearchProductDropdown
            stringSearch={searchString}
            onsetSearchString={setSearchString}
            result={searchResult}
            onSelectOption={handleChooseProduct}
          />
          <Box className="products-info-container">
            {receiptEdit?.products?.map((product, index) => (
              <>
                {product?.productAttribute?.id !== 0 && (
                  <Grid container gap={2} key={index} width={'100%'}>
                    <TextField disabled value={getFlatAttribute(product.productAttribute)} />
                    <NumericFormat
                      thousandSeparator=","
                      customInput={TextField}
                      value={product.cost === 0 ? null : product.cost}
                      label="Giá nhập"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <p>đ</p>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) =>
                        handleChangeReceiptProduct(index, 'cost', parseInt(e.target.value.replace(/,/g, '')))
                      }
                    />
                    <NumericFormat
                      thousandSeparator=","
                      customInput={TextField}
                      value={product.quantity === 0 ? null : product.quantity}
                      label="Số lượng"
                      onChange={(e) =>
                        handleChangeReceiptProduct(index, 'quantity', parseInt(e.target.value.replace(/,/g, '')))
                      }
                    />
                    <TextField
                      disabled
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <p>đ</p>
                          </InputAdornment>
                        ),
                      }}
                      value={(product?.quantity * product?.cost).toLocaleString()}
                    />
                    <IconButton size="large">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                )}
              </>
            ))}
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
};

export default memo(ReceiptCreating);
