import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, InputLabel, FormControl, MenuItem, TextField, Grid } from '@mui/material';
import {
  Reorder as ReorderIcon,
  Money as MoneyIcon,
  Discount as DiscountIcon,
  ModeEdit as ModeEditIcon,
} from '@mui/icons-material';
import { LineChart } from '@mui/x-charts/LineChart';

import Select from '@mui/material/Select';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import { inventorySelector, userModelSelector } from 'src/redux/selector';
import { useSelector } from 'react-redux';
import useGetStatistic from 'src/hook/statistic/useGetSellingStatistic';
import './style.scss';
import { stockManagementTime } from 'src/general/constants/utils.constants';
import useGetStatisticDetail from 'src/hook/statistic/useGetSellingStatisticDetail';
import Loading from 'src/general/components/Loading';
import { getformatDate } from 'src/utils/formatDate';
import useGetTopCustomerExpenditure from 'src/hook/customer/useGetTopCustomerExpenditure';
import { formatPhoneNumber } from 'src/utils/phoneFormat';
import useGetTopCustomerOrder from 'src/hook/customer/useGetTopCustomerOrder';
import { PATH_CUSTOMER } from 'src/general/constants/path';
import { CustomerType } from 'src/types/customer.type';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userModel = useSelector(userModelSelector);
  const [createActionHistory] = useCreateActionHistory();
  const inventories = useSelector(inventorySelector);
  const [inventory, setInventory] = useState(inventories[0]?.id);
  const { statistic, isPendingStatictic, reFetchStatictic } = useGetStatistic(userModel.storeId);
  const { statisticDetail, isPendingStaticticDetail, reFetchStaticticDetail } = useGetStatisticDetail(
    userModel.storeId
  );
  const { topCustomerExpenditure, isPendingTopCustomerExpenditure, reFetchTopCustomerExpenditure } =
    useGetTopCustomerExpenditure(userModel.storeId);
  const { topCustomerOrder, isPendingTopCustomerOrder, reFetchTopCustomerOrder } = useGetTopCustomerOrder(
    userModel.storeId
  );
  const [time, setTime] = useState<string>('THREE_MONTH');

  useEffect(() => {
    reFetchStatictic({ inventoryId: inventory, time });
    reFetchStaticticDetail({ inventoryId: inventory, time });
    reFetchTopCustomerExpenditure({ inventoryId: inventory, time });
    reFetchTopCustomerOrder({ inventoryId: inventory, time });
  }, [time, inventory]);
  const handleNavigteDetailCustomer = (item: CustomerType) => {
    navigate(PATH_CUSTOMER.CUSTOMER_DETAIL.replace(':id', item.id.toString()), {
      state: {
        pageTitle: 'Quay về trang thống kê',
        typeTitle: 'navigate',
        onTitleClick: '/main/management/dashboard',
      },
    });
  };
  useEffect(() => {
    createActionHistory({ message: 'Màn hình thống kê' });
  }, []);
  const chartDataPrice = useMemo(() => {
    return statisticDetail?.map((detail) => ({ ...detail, date: getformatDate(detail.date) }));
  }, [statisticDetail]);

  return (
    <div className="">
      <BaseLayout topbarChildren={<CustomeTopbar pageTitle="Thống kê" />}>
        <Box className="content">
          <Box className="content-wrapper">
            <Grid container justifyContent={'space-between'}>
              <Grid item xs={12} lg={6} container gap={2} alignItems={'center'}>
                <p className="title-2">Hoạt động</p>
                <FormControl>
                  <InputLabel id="select-inventory">Thời gian</InputLabel>
                  <Select
                    label="Thời gian"
                    size="small"
                    labelId="select-inventory"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    {stockManagementTime?.map((time) => (
                      <MenuItem key={time.value} value={time.value}>
                        {time.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid className="relative-block">
                <FormControl>
                  <InputLabel id="select-inventory">Kho</InputLabel>
                  <Select
                    label="Kho"
                    size="small"
                    labelId="select-inventory"
                    value={inventory}
                    onChange={(e) => setInventory(e.target.value as number)}
                  >
                    {inventories &&
                      inventories?.map((inventory) => (
                        <MenuItem key={inventory.id} value={inventory?.id}>
                          {inventory.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} className="dasdboard-wrapper">
              <Grid xs={3.5} className="dasdboard-wrapper-item">
                <Grid container justifyContent={'space-between'}>
                  <p className="text-center text-title">{statistic?.totalOrderValue?.toLocaleString()} đ</p>
                  <ReorderIcon />
                </Grid>
                <p>Doanh số</p>
              </Grid>
              <Grid xs={3.5} className="dasdboard-wrapper-item">
                <Grid container justifyContent={'space-between'}>
                  <p className="text-center text-title">
                    {(statistic?.totalOrderValue - statistic?.totalMoney)?.toLocaleString()} đ
                  </p>

                  <MoneyIcon />
                </Grid>
                <p>Lãi suất</p>
              </Grid>
              <Grid xs={3.5} className="dasdboard-wrapper-item">
                <Grid container justifyContent={'space-between'}>
                  <p className="text-center text-title">{statistic.totalOrder?.toLocaleString()} đ</p>
                  <DiscountIcon />
                </Grid>
                <p>Đơn hàng</p>
              </Grid>
            </Grid>
            <Grid className="dasdboard-wrapper">
              <p className="title-2 text-start">Doanh số</p>
              <Box>
                {isPendingStaticticDetail ? (
                  <Loading isLoading={isPendingStaticticDetail} size={36} />
                ) : (
                  <LineChart
                    dataset={chartDataPrice}
                    xAxis={[
                      {
                        scaleType: 'point',
                        dataKey: 'date',
                      },
                    ]}
                    series={[
                      {
                        showMark: false,
                        type: 'line',
                        dataKey: 'total',
                      },
                    ]}
                    height={500}
                    className="pay-time-chart"
                  />
                )}
              </Box>
            </Grid>
            <Grid container className="dasdboard-wrapper" wrap="wrap" justifyContent={'space-between'}>
              <Grid item xs={12} lg={5.9} className="dasdboard-wrapper-item">
                <p className="title-2 mb16">Top khách hàng mua lớn nhất</p>
                {isPendingTopCustomerExpenditure && <Loading isLoading={isPendingTopCustomerExpenditure} size={36} />}
                {topCustomerExpenditure?.map((customer) => (
                  <React.Fragment key={customer?.customer?.id}>
                    <Grid className="mt-2" container justifyContent={'space-between'}>
                      <Grid xs={5}>
                        {customer?.customer?.id ? (
                          <p
                            className="text-start pointer-text navigate-text"
                            role="presentation"
                            onClick={() => handleNavigteDetailCustomer(customer.customer)}
                          >
                            {customer?.customer?.name} {formatPhoneNumber(customer?.customer?.phone)}
                          </p>
                        ) : (
                          <p className="text-start">Khách lẻ</p>
                        )}
                      </Grid>
                      <Grid xs={3.5}>
                        <p>{customer.totalExpenditure?.toLocaleString()} đ</p>
                      </Grid>
                      <Grid xs={3.5}>
                        <p>{customer.totalOrder?.toLocaleString()} đơn hàng</p>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
              <Grid item xs={12} lg={5.9} className="dasdboard-wrapper-item">
                <p className="title-2 mb16">Top khách hàng mua thường xuyên nhất</p>
                {isPendingTopCustomerOrder && <Loading isLoading={isPendingTopCustomerOrder} size={36} />}
                {topCustomerOrder?.map((customer) => (
                  <React.Fragment key={customer?.customer?.id}>
                    <Grid className="mt-2" container justifyContent={'space-between'}>
                      <Grid xs={5}>
                        {customer?.customer?.id ? (
                          <p
                            className="text-start pointer-text navigate-text"
                            role="presentation"
                            onClick={() => handleNavigteDetailCustomer(customer.customer)}
                          >
                            {customer?.customer?.name} {formatPhoneNumber(customer?.customer?.phone)}
                          </p>
                        ) : (
                          <p>Khách lẻ</p>
                        )}
                      </Grid>
                      <Grid xs={3.5}>
                        <p>{customer.totalExpenditure?.toLocaleString()} đ</p>
                      </Grid>
                      <Grid xs={3.5}>
                        <p>{customer.totalOrder?.toLocaleString()} đơn hàng</p>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
            <Grid className="dasdboard-wrapper">
              <Grid className="dasdboard-wrapper-item">
                <p>Top sản phẩm ưa chuộng nhất</p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </BaseLayout>
    </div>
  );
};

export default memo(Dashboard);
