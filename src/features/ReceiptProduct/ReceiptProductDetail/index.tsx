import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useGetReceiptProduct from 'src/hook/receiptProduct/useGetDetailReceipt';
import './ReceiptProductDetail.style.scss';
import { Button, Grid, TextField, InputAdornment, Box } from '@mui/material';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import Loading from 'src/general/components/Loading';
import { NumericFormat } from 'react-number-format';
import { getformatDate } from 'src/utils/formatDate';
import { formatPhoneNumber } from 'src/utils/phoneFormat';
import { getFlatAttribute } from 'src/utils/getFlatAttribute';
import { PATH_RECEIPT_PRODUCT } from 'src/general/constants/path';
import { updateReceiptEdit } from '../ReceiptProductCreating/receiptSlice';
import usePayReceipt from 'src/hook/receiptProduct/usePayReceiptOrder';
import useInventoryInReceipt from 'src/hook/receiptProduct/useInventoryInReceipt';
import useDeleteReceipt from 'src/hook/receiptProduct/useDeleteReceipt';

const ReceiptProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pageTitle, typeTitle, onTitleClick } = location.state || {};
  const [createActionHistory] = useCreateActionHistory();
  const [payReceipt, isPendingPayReceipt] = usePayReceipt(id ? Number(id) : 0);
  const [inventoryInReceipt, isPendingInventoryInReceipt] = useInventoryInReceipt(id ? Number(id) : 0);
  const [deleteReceipt, isPendingDeleteReceipt] = useDeleteReceipt();
  const [receiptDetail, isPendingGetReceiptDetail, getReceiptDetail] = useGetReceiptProduct(id ?? '0');
  const handleBackPage = useCallback(
    (link: string) => {
      navigate(`${link}`);
    },
    [onTitleClick]
  );
  useEffect(() => {
    createActionHistory({ message: `Màn hình chi tiết đơn hàng: ${id}` });
  }, []);

  const handlePay = () => {
    payReceipt()
      .then((res) => {
        dispatch(openAlert({ message: `Thanh toán đơn hàng thành công`, type: 'success' }));
        getReceiptDetail();
        return res;
      })
      .catch((err) => {
        if (err?.status === 404) {
          dispatch(
            openAlert({
              message: `Đơn hàng không tồn tại hoặc đã bị xóa\n Quay lại trang danh sách đơn hàng`,
              type: 'error',
            })
          );
          navigate(PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_LIST_PATH);
        }
      });
  };
  const handleInventoryIn = () => {
    inventoryInReceipt()
      .then((res) => {
        dispatch(openAlert({ message: 'Đơn hàng nhập kho thành công', type: 'success' }));
        getReceiptDetail();
        return res;
      })
      .catch((err) => {
        if (err?.status === 404) {
          dispatch(
            openAlert({
              message: `Đơn hàng không tồn tại hoặc đã bị xóa\n Quay lại trang danh sách đơn hàng`,
              type: 'error',
            })
          );
          navigate(PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_LIST_PATH);
        }
      });
  };
  const handleEdit = () => {
    if (receiptDetail.payStatus || receiptDetail.receiptStatus) {
      // dispatch(openAlert({ message: `Đơn hàng đã thanh toán hoặc nhập kho\n Không thể chỉnh sửa`, type: 'error' }));
    }
    dispatch(updateReceiptEdit(receiptDetail));
    navigate(PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_CREATE_PATH, {
      state: {
        pageTitle: 'Quay về trang chi tiết đơn hàng',
        typeTitle: 'navigate',
        onTitleClick: PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_DETAIL_PATH.replace(':id', receiptDetail.id.toString()),
      },
    });
  };
  const handleDeleteReceipt = () => {
    deleteReceipt(Number(id))
      .then((res) => {
        // dispatch(openAlert({ message: 'Xóa đơn hàng thành công', type: 'success ' }));
        navigate(PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_LIST_PATH);
        return res;
      })
      .catch((err) => {
        if (err?.status === 400) {
          dispatch(
            openAlert({
              message: `Đơn hàng không thể xóa do đã thanh toán hoặc nhập kho`,
              type: 'error',
            })
          );
        }
      });
  };
  return (
    <div>
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle={pageTitle ? pageTitle : 'Chi tiết đơn hàng'}
            typeTitle={typeTitle ? typeTitle : 'text'}
            onTitleClick={() => handleBackPage(onTitleClick)}
            buttonGroup={[
              {
                buttonTitle: 'Thanh toán',
                onClick: handlePay,
                disable: isPendingPayReceipt || receiptDetail.payStatus === 1,
              },
              {
                buttonTitle: 'Nhập kho',
                onClick: handleInventoryIn,
                disable: isPendingInventoryInReceipt || receiptDetail.receiptStatus === 1,
              },
            ]}
          />
        }
      >
        <>
          {isPendingGetReceiptDetail && <Loading isLoading={isPendingGetReceiptDetail} size={36} />}
          <div className="content">
            <Grid container wrap="wrap" justifyContent={'space-between'} className="header-receipt">
              <h1 className="header-receipt-title text-center">{receiptDetail?.code}</h1>
              {!receiptDetail.payStatus && !receiptDetail.receiptStatus && (
                <Grid container gap={2} width={'25%'} justifyContent={'flex-end'}>
                  <Button
                    variant="outlined"
                    color="error"
                    disabled={isPendingDeleteReceipt}
                    onClick={handleDeleteReceipt}
                  >
                    Xóa
                  </Button>
                  <Button variant="outlined" color="success" onClick={handleEdit}>
                    Sửa đơn hàng
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid className="base-info-detail" wrap="wrap" justifyContent={'space-between'} container>
              <Grid item container className="base-info-detail-item" gap={4} xs={12} lg={8}>
                <Grid xs={12}>
                  <p></p>
                  <TextField
                    fullWidth
                    disabled
                    label="Nhà cung cấp"
                    value={receiptDetail?.supplier?.name ? receiptDetail?.supplier?.name : 'Nhà cung cấp'}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    label="Kho"
                    value={receiptDetail?.inventory?.name ? receiptDetail?.inventory?.name : 'Kho'}
                  />
                </Grid>
                {receiptDetail?.bookingUser?.id !== 0 && (
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      label="Nhân viên tạo"
                      value={receiptDetail?.bookingUser?.name ? receiptDetail?.bookingUser?.name : 'Nhân viên tạo'}
                    />
                  </Grid>
                )}
                {receiptDetail?.confirmUser?.id !== 0 && (
                  <Grid xs={12}>
                    <TextField fullWidth disabled label="Nhân viên nhập kho" value={receiptDetail?.confirmUser?.name} />
                  </Grid>
                )}
                <Grid xs={12}>
                  <TextField fullWidth disabled label="Ngày tạo" value={getformatDate(receiptDetail.bookingDate)} />
                </Grid>
                {receiptDetail.receiptDate && (
                  <Grid xs={12}>
                    <TextField
                      disabled
                      fullWidth
                      label="Ngày nhập kho"
                      value={getformatDate(receiptDetail.bookingDate)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <p>đ</p>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
                <Grid xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Giá trị đơn"
                    value={receiptDetail?.total ? receiptDetail?.total.toLocaleString() : 0}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} lg={3.8} className="base-info-detail-item">
                <p className="mb16 header-title2">Thông tin nhà cung cấp</p>
                <Grid container justifyContent={'space-between'}>
                  <p>Địa chỉ</p>
                  <p className="w70">: {receiptDetail.supplier?.address}</p>
                </Grid>
                <Grid container justifyContent={'space-between'}>
                  <p>Số điện thoại</p>
                  <p className="w70">: {formatPhoneNumber(receiptDetail.supplier?.phone) ?? ''}</p>
                </Grid>
                <Grid container justifyContent={'space-between'}>
                  <p>Số tiền nợ</p>
                  <p className="w70 sell-price">
                    : {receiptDetail.supplier?.deptMoney ? receiptDetail.supplier?.deptMoney.toLocaleString() : null} đ
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Box className="receipt-products-info">
              <h1 className="mb16 header-title2">Thông tin sản phẩm</h1>
              <Grid container gap={2}>
                {receiptDetail?.products?.map((product, index) => (
                  <React.Fragment key={index}>
                    {product?.productAttribute?.id && (
                      <Grid container gap={2} justifyContent={'space-around'} key={index} width={'100%'}>
                        <TextField
                          className="receipt-products-info-item"
                          label="Sản phẩm"
                          disabled
                          value={getFlatAttribute(product.productAttribute)}
                        />
                        <NumericFormat
                          thousandSeparator=","
                          className="receipt-products-info-item"
                          disabled
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
                        />
                        <NumericFormat
                          disabled
                          thousandSeparator=","
                          className="receipt-products-info-item"
                          customInput={TextField}
                          value={product.quantity === 0 ? null : product.quantity}
                          label="Số lượng"
                        />
                        <TextField
                          disabled
                          className="receipt-products-info-item"
                          label="Tổng giá trị"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <p>đ</p>
                              </InputAdornment>
                            ),
                          }}
                          value={(product?.quantity * product?.cost).toLocaleString()}
                        />
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </div>
        </>
      </BaseLayout>
    </div>
  );
};

export default memo(ReceiptProductDetail);
