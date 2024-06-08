import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useGetReceiptProduct from 'src/hook/receiptProduct/useGetDetailReceipt';
import { Button, Grid, TextField, InputAdornment, Box, Divider } from '@mui/material';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import Loading from 'src/general/components/Loading';
import './StockTakeDetail.style.scss';
import useUpdateInventory from 'src/hook/stockTake/useUpdateInventory';
import useGetStockTakeDetail from 'src/hook/stockTake/useGetStockTakeDetail';
import SelectField from 'src/general/components/Filter/SelectField';
import { getDayjsFormatDate } from 'src/utils/formatDate';
import DateField from 'src/general/components/Filter/DateField';
import { NumericFormat } from 'react-number-format';
import { getFlatAttribute } from 'src/utils/getFlatAttribute';
import useGetUsers from 'src/hook/user/useGetStaff';
import '../StockTakeEdit/StockTakeEdit.style.scss';
import useDeleteStockTake from 'src/hook/stockTake/useDeleteStockTake';
import { PATH_INVENTORY_TAKE_CARE } from 'src/general/constants/path';
import { updateStockTakeEdit } from '../StockTakeEdit/stockTakeSlice';
import DuaTextField from 'src/general/components/Field/DuaTextField';
import { useSelector } from 'react-redux';
import { inventorySelector, userModelSelector } from 'src/redux/selector';

const StockTakeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userModel = useSelector(userModelSelector);
  const { pageTitle, typeTitle, onTitleClick } = location.state || {};
  const [createActionHistory] = useCreateActionHistory();
  const [updateInventory, isPendingUpdateInventory] = useUpdateInventory();
  const inventories = useSelector(inventorySelector);
  const { staffs } = useGetUsers(userModel.storeId);
  const [stockTakeDetail, isPendingGetStockTakeDetail] = useGetStockTakeDetail(String(id));
  const [deleteStockTake, isPendingDeleteStockTake] = useDeleteStockTake();
  const handleBackPage = useCallback(
    (link: string) => {
      navigate(`${link}`);
    },
    [onTitleClick]
  );
  useEffect(() => {
    createActionHistory({ message: `Màn hình chi tiết phiếu kiểm kho: ${id}` });
  }, []);
  const handleInventoryIn = () => {
    updateInventory(Number(id))
      .then((res) => {
        dispatch(openAlert({ message: 'Cập nhập số lượng kho thành công', type: 'success' }));
      })
      .catch((err) => {
        dispatch(openAlert({ message: 'Cập nhập số lượng kho thất bại', type: 'error' }));
      });
  };
  const handleDeleteStockTake = () => {
    deleteStockTake(Number(id))
      .then(() => {
        dispatch(
          openAlert({
            message: `Xóa phiếu kiểm kho thành công.\n Quay lại trang danh sách phiếu kiểm`,
            type: 'success',
          })
        );
        navigate(PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_LIST_PATH);
      })
      .catch(() => {
        dispatch(openAlert({ message: `Xóa phiếu kiểm kho không thành công.`, type: 'error' }));
      });
  };
  const handleEditStockTake = () => {
    dispatch(updateStockTakeEdit(stockTakeDetail));
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
    <>
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle={pageTitle ? pageTitle : 'Chi tiết phiếu kiểm kho'}
            typeTitle={typeTitle ? typeTitle : 'text'}
            onTitleClick={() => handleBackPage(onTitleClick)}
            buttonGroup={[
              {
                buttonTitle: 'Xóa',
                color: 'error',
                onClick: handleDeleteStockTake,
                disable: isPendingGetStockTakeDetail || isPendingDeleteStockTake || stockTakeDetail.status === 1,
              },
              {
                buttonTitle: 'Sửa phiếu',
                color: 'secondary',
                onClick: handleEditStockTake,
                disable: isPendingGetStockTakeDetail || stockTakeDetail.status === 1,
              },
              {
                buttonTitle: 'Cập nhập số lượng',
                onClick: handleInventoryIn,
                disable: isPendingGetStockTakeDetail || isPendingUpdateInventory || stockTakeDetail.status === 1,
              },
            ]}
          />
        }
      >
        <>
          {isPendingGetStockTakeDetail && <Loading isLoading={isPendingGetStockTakeDetail} size={36} />}

          <div className="content">
            <Box className="content stock-take-edit">
              <Grid className="base-info">
                <p className="mb16 header-title2">Thông tin phiếu</p>
                <Grid
                  container
                  wrap="wrap-reverse"
                  gap={2}
                  justifyContent={'space-between'}
                  className="code-status stock-take-edit-code"
                >
                  <Grid xs={12} lg={8}>
                    <TextField
                      label="Mã phiếu"
                      disabled
                      fullWidth
                      value={stockTakeDetail?.code ? stockTakeDetail?.code : 'Mã phiếu'}
                    />
                  </Grid>
                  <Grid container justifyContent={'center'} alignItems={'center'} xs={12} lg={3.8}>
                    {stockTakeDetail.status === 1 ? (
                      <p className="susscess-status">Đã cập nhập số lượng</p>
                    ) : (
                      <p className="error-color">Chưa xác nhận phiếu điều chỉnh</p>
                    )}
                  </Grid>
                </Grid>
                <DuaTextField title="Kho" disable value={stockTakeDetail?.inventory?.name} />
                <Grid container gap={3} justifyContent={'space-between'} className="mb24">
                  <Grid xs={24} lg={5.85}>
                    <TextField
                      fullWidth
                      label="Nhân viên tạo"
                      disabled
                      value={stockTakeDetail?.create?.name ?? 'Nhân viên tạo'}
                    />
                  </Grid>
                  <Grid xs={24} lg={5.85}>
                    <TextField
                      fullWidth
                      label="Nhân viên xác nhận"
                      disabled
                      value={stockTakeDetail?.confirm?.name ?? 'Nhân viên xác nhận'}
                    />
                  </Grid>
                </Grid>
                <DateField
                  disable
                  title="Ngày đặt hàng"
                  date={stockTakeDetail.createAt ? getDayjsFormatDate(stockTakeDetail.createAt) : null}
                />
              </Grid>
              <Box className="products-info">
                <p className="mb16 header-title2">Sản phẩm điều chỉnh</p>
                <Box className="products-info-container">
                  {stockTakeDetail?.details?.map((detail, index) => (
                    <>
                      {detail?.productAttribute?.id !== 0 && (
                        <Grid container gap={2} key={index} width={'100%'}>
                          <Grid xs={12} lg={2.6}>
                            <TextField fullWidth disabled value={getFlatAttribute(detail.productAttribute)} />
                          </Grid>
                          <Grid xs={12} lg={2.6}>
                            <NumericFormat
                              disabled
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
                            />
                          </Grid>
                          <Grid xs={12} lg={2.6}>
                            <NumericFormat
                              disabled
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
                            />
                          </Grid>
                          <Grid xs={12} lg={2.6}>
                            <TextField disabled fullWidth value={detail?.reason} placeholder="Lý do thay đổi" />
                          </Grid>
                        </Grid>
                      )}
                      <Divider variant="middle" component="a" />
                    </>
                  ))}
                </Box>
              </Box>
            </Box>
          </div>
        </>
      </BaseLayout>
    </>
  );
};

export default memo(StockTakeDetail);
