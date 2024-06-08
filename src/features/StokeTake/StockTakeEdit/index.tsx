import { Box, Divider, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useGetProductList from 'src/hook/product/useGetProductsList';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import useGetUsers from 'src/hook/user/useGetStaff';
import { inventorySelector, stockTakeEditSelector, userModelSelector } from 'src/redux/selector';
import { FilterProductType, ProductAttributeType, ProductList } from 'src/types/Product';
import {
  addProductStockTakeEdit,
  changeStockTakeProductEdit,
  changeValueEditStockTake,
  deleteProductStockTake,
  updateStockTakeEdit,
} from './stockTakeSlice';
import { Add as AddIcon, Delete as DeleteIcon, Details } from '@mui/icons-material';
import { useDebounce } from 'src/hook/useDebounce';
import { initialStockTake, initialStockTakeDetail } from 'src/utils/initialValue';
import useCreateStockTake from 'src/hook/stockTake/useCreateStockTake';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';
import { PATH_INVENTORY_TAKE_CARE } from 'src/general/constants/path';
import useUpdateStockTake from 'src/hook/stockTake/useUpdateStockTake';
import SelectField from 'src/general/components/Filter/SelectField';
import DateField from 'src/general/components/Filter/DateField';
import { getDayjsFormatDate } from 'src/utils/formatDate';
import './StockTakeEdit.style.scss';
import SearchProductDropdown from 'src/general/components/SearchProductDropdown';
import { getFlatAttribute } from 'src/utils/getFlatAttribute';
import { NumericFormat } from 'react-number-format';
import { UserType } from 'src/types/user.type';

const StockTakeEdit = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = dayjs();
  const userModel = useSelector(userModelSelector);
  const stockTake = useSelector(stockTakeEditSelector);
  const { pageTitle, typeTitle, onTitleClick, typeFeature } = location.state ?? {};
  const [searchString, setSearchString] = useState<string>('');
  const [searchResult, setSearchResult] = useState<ProductList>({} as ProductList);
  const searchValue = useDebounce(searchString);
  const [createStockTake, isPendingCreateStockTake] = useCreateStockTake();
  const [updateStockTake, isPendingUpdateStockTake] = useUpdateStockTake();
  const inventories = useSelector(inventorySelector);
  const { staffs } = useGetUsers(userModel.storeId);
  const [createActionHistory] = useCreateActionHistory();
  const render = useRef(true);
  const [getProductList] = useGetProductList();
  const handleBackPage = useCallback(() => {
    navigate(`${onTitleClick}`);
  }, [onTitleClick]);
  useEffect(() => {
    if (Object.keys(stockTake).length === 0 && stockTake.constructor === Object) {
      dispatch(updateStockTakeEdit({ ...initialStockTake, storeId: userModel.id }));
    }
  }, [stockTake]);
  useEffect(() => {
    handleSearchProduct();
  }, [searchValue]);
  useEffect(() => {
    if (render.current) {
      createActionHistory({ message: 'Màn hình tạo phiếu điều chỉnh' });
    }
    render.current = false;
  });
  const handleSearchProduct = () => {
    getProductList({
      storeId: userModel.storeId,
      searchString: searchValue,
      inventoryId: stockTake?.inventory?.id,
    } as FilterProductType).then((res) => {
      setSearchResult(res);
    });
  };
  const handleChangeStaff = (id: number) => {
    const selectStaff = staffs.find((staff) => staff.id === id);
    dispatch(changeValueEditStockTake({ create: selectStaff }));
  };
  const handleChangeInventory = (id: number) => {
    const selectInventory = inventories.find((inventory) => inventory.id === id);
    dispatch(changeValueEditStockTake({ inventory: selectInventory }));
  };
  const handleChooseProduct = (attribute: ProductAttributeType) => {
    if (!stockTake.details.filter((detail) => detail.productAttribute.id !== attribute.id)) {
      dispatch(openAlert({ message: 'Sản phẩm đã sẵn sàng trong danh sách', type: 'error' }));
    } else {
      dispatch(addProductStockTakeEdit({ ...initialStockTakeDetail, productAttribute: attribute }));
    }
  };
  const dataPost = useMemo(() => {
    return {
      ...stockTake,
      storeId: userModel?.storeId,
      details: stockTake?.details
        ?.filter((detail) => detail?.productAttribute?.id !== 0)
        ?.map((detail) => ({ ...detail, oldQuantity: detail?.productAttribute?.quantity })),
      create: staffs.find(staff => staff?.id === userModel?.id) as UserType,
    };
  }, [stockTake]);
  const handleCreateStockTake = () => {
    createStockTake(dataPost)
      .then((res) => {
        dispatch(openAlert({ message: 'Tạo đơn phiếu kiểm kho thành công', type: 'success' }));
        navigate(PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_DETAIL_PATH.replace(':id', String(res.id)));
      })
      .catch((err) => {
        dispatch(openAlert({ message: `Tạo đơn phiếu kiểm kho thất bại,\n vui lòng thử lại sau`, type: 'error' }));
      });
  };
  const handleUpdateStockTake = () => {
    updateStockTake(dataPost)
      .then((res) => {
        dispatch(openAlert({ message: 'Cập nhập đơn phiếu kiểm kho thành công', type: 'success' }));
        navigate(PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_DETAIL_PATH.replace(':id', String(res.id)));
      })
      .catch((err) => {
        dispatch(openAlert({ message: `Cập nhập đơn phiếu kiểm kho thất bại,\n vui lòng thử lại sau`, type: 'error' }));
      });
  };
  const handleChangeStokTakeDetail = (index: number, key: string, value: any) => {
    dispatch(
      changeStockTakeProductEdit({
        index: index,
        field: {
          [key]: value,
        },
      })
    );
  };
  const handleDeleteProductStockTake = (id: number) => {
    dispatch(deleteProductStockTake(id));
  };
  return (
    <BaseLayout
      topbarChildren={
        <CustomeTopbar
          pageTitle={pageTitle ? pageTitle : 'Chi tiết phiếu kiểm kho'}
          typeTitle={typeTitle ? typeTitle : 'text'}
          onTitleClick={handleBackPage}
          buttonGroup={
            typeFeature === 'create'
              ? [
                  { buttonTitle: 'Hủy', onClick: handleBackPage, color: 'error' },
                  {
                    buttonTitle: 'Tạo phiếu kiểm kho',
                    onClick: handleCreateStockTake,
                    disable: isPendingCreateStockTake,
                  },
                ]
              : [
                  { buttonTitle: 'Hủy', onClick: handleBackPage, color: 'error' },
                  {
                    buttonTitle: 'Cập nhập phiếu kiểm kho',
                    onClick: handleUpdateStockTake,
                    disable: isPendingUpdateStockTake,
                  },
                ]
          }
        />
      }
    >
      <Box className="content stock-take-edit">
        <Grid className="base-info">
          <TextField
            label="Mã phiếu"
            fullWidth
            className="stock-take-edit-code"
            value={stockTake?.code}
            onChange={(e) => dispatch(changeValueEditStockTake({ code: e.target.value }))}
          />
          <SelectField
            title="Kho"
            value={stockTake?.inventory?.id}
            options={inventories.map((inventory) => ({ value: inventory.id, name: inventory.name }))}
            onChange={(value: number) => handleChangeInventory(value)}
            //   initialValue={initialSupplier}
          />
          <SelectField
            title="Nhân viên tạo"
            disable={true}
            value={userModel.id}
            options={staffs.map((staff) => ({ value: staff.id, name: staff?.name }))}
            onChange={(value: number) => handleChangeStaff(value)}
            //   initialValue={initialSupplier}
          />
          <DateField
            title="Ngày đặt hàng"
            date={stockTake.createAt ? getDayjsFormatDate(stockTake.createAt) : current}
          />
        </Grid>
        <Box className="products-info">
          <SearchProductDropdown
            stringSearch={searchString}
            onsetSearchString={setSearchString}
            result={searchResult}
            onSelectOption={handleChooseProduct}
          />
          <Box className="products-info-container">
            {stockTake?.details?.map((detail, index) => (
              <>
                {detail?.productAttribute?.id !== 0 && (
                  <>
                    <Grid container gap={2} key={index} width={'100%'}>
                      <Grid xs={12} lg={2.5}>
                        <TextField fullWidth disabled value={getFlatAttribute(detail.productAttribute)} />
                      </Grid>
                      <Grid xs={12} lg={2.5}>
                        <NumericFormat
                          fullWidth
                          thousandSeparator=","
                          customInput={TextField}
                          value={detail.oldQuantity === 0 ? detail.productAttribute.quantity : detail.oldQuantity}
                          label="Số lượng trên hệ thống"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <p>Sản phẩm</p>
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            handleChangeStokTakeDetail(index, 'oldQuantity', parseInt(e.target.value.replace(/,/g, '')))
                          }
                        />
                      </Grid>
                      <Grid xs={12} lg={2.5}>
                        <NumericFormat
                          fullWidth
                          thousandSeparator=","
                          customInput={TextField}
                          value={detail.actualQuantity === 0 ? null : detail.actualQuantity}
                          label="Số lượng thực tế"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <p>Sản phẩm</p>
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            handleChangeStokTakeDetail(
                              index,
                              'actualQuantity',
                              parseInt(e.target.value.replace(/,/g, ''))
                            )
                          }
                        />
                      </Grid>
                      <Grid xs={12} lg={2.5}>
                        <TextField
                          fullWidth
                          value={detail?.reason}
                          placeholder="Lý do thay đổi"
                          onChange={(e) => handleChangeStokTakeDetail(index, 'reason', e.target.value)}
                        />
                      </Grid>
                      <Grid xs={12} lg={1}>
                        <IconButton
                          size="large"
                          onClick={() => handleDeleteProductStockTake(detail?.productAttribute?.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Divider variant="middle" component="a" />
                  </>
                )}
              </>
            ))}
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
};
export default memo(StockTakeEdit);
