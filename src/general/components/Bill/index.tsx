import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { OrderDetailType, SellingOrderType } from 'src/types/selling.type';
import { getFlatAttribute } from 'src/utils/getFlatAttribute';
import { formatPhoneNumber } from 'src/utils/phoneFormat';
import { payStatusOptions } from 'src/general/constants/utils.constants';
import { initialPayment } from 'src/utils/initialValue';
import { getTotalPriceSelling } from 'src/utils/getTotalPriceSelling';
// (parameter) ref: React.ForwardedRef<HTMLDivElement>

type ComponentToPrintProps = {
  selling: SellingOrderType;
  onChangeSelling: (title: string, value: any) => void;
};

const Bill = forwardRef<HTMLDivElement, ComponentToPrintProps>((props, ref) => {
  const { selling, onChangeSelling } = props;
  return (
    <div ref={ref} className="bill print-container">
      <p className="bill-title">Hóa đơn</p>
      <p className="mt-6 customer customer-name">Khách hàng: {selling?.customer?.name}</p>
      <p className="mt-6 customer">SĐT: {formatPhoneNumber(selling?.customer?.phone)}</p>
      {selling?.details?.map(
        (detail) =>
          detail?.product?.id !== 0 && (
            <Grid justifyContent={'space-between'} container key={detail?.product?.id} className="bill-row">
              <Grid xs={7}>
                <p className="center-col h-100 text-start">{getFlatAttribute(detail?.product)}</p>
              </Grid>
              <Grid xs={2}>
                <p className="center-col h-100">x{detail?.quantity}</p>
              </Grid>
              <Grid xs={3}>
                <p className="center-col d-block h-100">
                  <p className={detail.discount ? 'old-price fz-11 text-start' : 'center-col fz-11 h-100'}>
                    {(detail.price * detail.quantity).toLocaleString()}
                  </p>
                  {detail.discount !== 0 && !Number.isNaN(detail?.discount) && (
                    <p className="fz-11 text-start">
                      {(detail.price * detail.quantity * ((100 - detail.discount) / 100)).toLocaleString()}
                    </p>
                  )}
                </p>
              </Grid>
            </Grid>
          )
      )}
      <p className="mt12">Tổng giá trị: {getTotalPriceSelling(selling)?.toLocaleString()}</p>
      <TextField
        value={selling?.discount}
        type="number"
        size="small"
        label="Giảm giá"
        className="mt12"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <p>%</p>
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          onChangeSelling('discount', parseInt(e.target.value));
        }}
      />
      <span className="d-flex mt12">
        Thành tiền:{' '}
        <div>
          <p className={selling?.discount ? 'old-price text-start' : 'center-col h-100'}>
            {Number(getTotalPriceSelling(selling)).toLocaleString()} đ
          </p>
          {selling?.discount !== 0 && !Number.isNaN(selling?.discount) && (
            <p className="text-start">
              {(getTotalPriceSelling(selling) * ((100 - selling?.discount) / 100))?.toLocaleString()} đ
            </p>
          )}
        </div>
      </span>
      <FormControl fullWidth className="mt-6">
        <p>Hình thức thanh toán</p>
        <Select
          size="small"
          value={selling?.paymentType}
          onChange={(e) => onChangeSelling('paymentType', e.target.value)}
        >
          {initialPayment.map((payOption) => (
            <MenuItem key={payOption.type} value={payOption?.type}>
              {payOption?.field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});

Bill.displayName = 'Bill';

export default Bill;
