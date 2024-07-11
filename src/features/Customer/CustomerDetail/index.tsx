import { Box, Grid, InputAdornment, InputLabel, TextField } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import Loading from 'src/general/components/Loading';
import CustomTable from 'src/general/components/Table/CustomeTable';
import { SellingTicketColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import './CustomerDetail.styles.scss';
import useGetCustomerDetail from 'src/hook/customer/useGetCustomerDetail';
import { userModelSelector } from 'src/redux/selector';
import useGetSellingsByCustomer from 'src/hook/selling/useGetSellingByCustomer';
import { SellingOrderType } from 'src/types/selling.type';
import { metaData } from 'src/types/MetaData';
const CustomerDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userModel = useSelector(userModelSelector);
  const { pageTitle = '', typeTitle, onTitleClick } = location.state ?? {};
  const { customer, isPendingGetCustomer } = useGetCustomerDetail(parseInt(id as string));
  const { getSellingsByCustomer, isPendingGetSellingsByCustomer } = useGetSellingsByCustomer(parseInt(id as string));
  const [createActionHistory] = useCreateActionHistory();
  const [sellings, setSellings] = useState<SellingOrderType[]>([]);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const handleBackPage = useCallback(() => {
    navigate(`${onTitleClick}`);
  }, [onTitleClick]);

  useEffect(() => {
    createActionHistory({ message: 'Màn hình chi tiết khách hàng' });
    getSellingsByCustomer().then((res) => {
      setSellings(res.data);
      setMetadata(res.metaData);
    });
  }, []);
  return (
    <BaseLayout
      topbarChildren={
        <CustomeTopbar
          pageTitle={pageTitle ? pageTitle : 'Chi tiết khách hàng'}
          typeTitle={typeTitle ? typeTitle : 'text'}
          onTitleClick={handleBackPage}
        />
      }
    >
      <Grid className="content customer-detail">
        {isPendingGetCustomer && <Loading isLoading={isPendingGetCustomer} size={35} />}
        <Grid container item className="customer-detail-info" gap={3}>
          <p className="text-start title-2">Thông tin khách hàng</p>

          <Grid className="base-info" wrap="wrap" justifyContent={'space-between'} container gap={3} xs={12}>
            <TextField
              label="Tên khách hàng"
              fullWidth
              disabled
              className="base-info-name"
              value={customer?.name ? customer?.name : ''}
            />

            <TextField
              label="Mã khách hàng"
              fullWidth
              disabled
              className="base-info-code"
              value={customer?.code ? customer?.code : ''}
            />

            <TextField
              type="number"
              fullWidth
              disabled
              label="Số điện thoại"
              className="base-info-code"
              value={customer?.phone ? customer?.phone : ''}
            />
          </Grid>
        </Grid>
        <Grid className="customer-detail-action-history mt12" xs={12}>
          <p className="text-start title-2">Số đơn mua</p>
          <CustomTable
            columns={SellingTicketColumn}
            pagination
            metadata={metadata}
            rows={sellings?.map((selling) => ({ ...selling, key: selling.id }))}
          />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
export default memo(CustomerDetail);
