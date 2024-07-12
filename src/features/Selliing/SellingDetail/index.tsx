import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useGetReceiptProduct from 'src/hook/receiptProduct/useGetDetailReceipt';
import { Button, Grid, TextField, InputAdornment, Box } from '@mui/material';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import Loading from 'src/general/components/Loading';
import { NumericFormat } from 'react-number-format';
import { getformatDate } from 'src/utils/formatDate';
import { formatPhoneNumber } from 'src/utils/phoneFormat';
import { getFlatAttribute } from 'src/utils/getFlatAttribute';
import { PATH_RECEIPT_PRODUCT } from 'src/general/constants/path';
import useGetSellingDetail from 'src/hook/selling/useGetSellingDetail';
import CustomerNavigate from 'src/general/components/NavigateItem/CustomerNavigate';
import { initialPayment } from 'src/utils/initialValue';
import './style.scss';

const SellingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pageTitle, typeTitle, onTitleClick } = location.state || {};
  const [createActionHistory] = useCreateActionHistory();
  const { sellingDetail, isPendingGetSellingDetail, getSellingDetail } = useGetSellingDetail(String(id));
  const handleBackPage = useCallback(
    (link: string) => {
      navigate(`${link}`);
    },
    [onTitleClick]
  );
  useEffect(() => {
    createActionHistory({ message: `Màn hình chi tiết đơn bán hàng: ${id}` });
  }, []);

  return (
    <div>
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle={pageTitle ? pageTitle : 'Chi tiết đơn bán hàng'}
            typeTitle={typeTitle ? typeTitle : 'text'}
            onTitleClick={() => handleBackPage(onTitleClick)}
          />
        }
      >
        <>
          {isPendingGetSellingDetail && <Loading isLoading={isPendingGetSellingDetail} size={36} />}
          <div className="content">
            <Grid className="base-info-detail" wrap="wrap" justifyContent={'space-between'} container>
              <Grid item container className="base-info-detail-item" gap={4}>
                <Grid xs={12}>
                  <p></p>
                  <TextField
                    fullWidth
                    disabled
                    label="Mã phiếu"
                    value={sellingDetail?.code ? sellingDetail?.code : 'Mã phiếu'}
                  />
                </Grid>
                {sellingDetail?.customer?.id !== 0 ? (
                  <Grid xs={12}>
                    <CustomerNavigate item={sellingDetail?.customer} />
                  </Grid>
                ) : (
                  <p>Khách lẻ</p>
                )}
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    label="Nhân viên bán"
                    value={sellingDetail?.staff?.name ? sellingDetail?.staff?.name : 'Nhân viên bán'}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField fullWidth disabled label="Ngày bán" value={getformatDate(sellingDetail?.createAt)} />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    label="Hình thức thanh toán"
                    value={
                      sellingDetail.paymentType
                        ? initialPayment.find((item) => item.type === sellingDetail.paymentType)?.field
                        : 'Hình thức thanh toán'
                    }
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Giảm giá"
                    value={sellingDetail?.discount}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <p>%</p>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Giá trị đơn"
                    value={sellingDetail?.total ? sellingDetail?.total.toLocaleString() : 0}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box className="receipt-products-info">
              <h1 className="mb16 header-title2">Thông tin sản phẩm</h1>
              <Grid container gap={2}>
                {sellingDetail?.details?.map((detail, index) => (
                  <React.Fragment key={index}>
                    {detail?.product?.id && (
                      <Grid container justifyContent={'space-between'} key={index} width={'100%'}>
                        <Grid xs={2}>
                          <TextField
                            className="receipt-products-info-item"
                            label="Sản phẩm"
                            fullWidth
                            disabled
                            value={getFlatAttribute(detail.product)}
                          />
                        </Grid>
                        <Grid xs={2}>
                          <NumericFormat
                            thousandSeparator=","
                            className="receipt-products-info-item"
                            fullWidth
                            disabled
                            customInput={TextField}
                            value={detail.product.sellPrice === 0 ? null : detail.product.sellPrice}
                            label="Giá bán"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <p>đ</p>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid xs={2}>
                          <NumericFormat
                            disabled
                            fullWidth
                            thousandSeparator=","
                            className="receipt-products-info-item"
                            customInput={TextField}
                            value={detail.quantity === 0 ? null : detail.quantity}
                            label="Số lượng"
                          />
                        </Grid>
                        <Grid xs={2}>
                          <NumericFormat
                            thousandSeparator=","
                            className="receipt-products-info-item"
                            disabled
                            fullWidth
                            customInput={TextField}
                            value={detail.discount}
                            label="Giảm giá"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <p>%</p>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid xs={2}>
                          <TextField
                            disabled
                            className="receipt-products-info-item"
                            fullWidth
                            label="Tổng giá trị"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <p>đ</p>
                                </InputAdornment>
                              ),
                            }}
                            value={(
                              detail?.quantity *
                              detail?.product.sellPrice *
                              ((100 - detail.discount) / 100)
                            ).toLocaleString()}
                          />
                        </Grid>
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

export default memo(SellingDetail);
