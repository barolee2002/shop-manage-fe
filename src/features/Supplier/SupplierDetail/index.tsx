import { Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import Loading from 'src/general/components/Loading';
import CustomTable from 'src/general/components/Table/CustomeTable';
import { ReceiptListColumn, SellingTicketColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import './SupplierDetail.styles.scss';
import { inventorySelector, userModelSelector } from 'src/redux/selector';
import { metaData } from 'src/types/MetaData';
import useGetSupplierDetail from 'src/hook/supplier/useGetSupplierDetail';
import { formatPhoneNumber } from 'src/utils/phoneFormat';
import useGetReceiptProductList from 'src/hook/receiptProduct/useGetReceiptProductList';
import { FilterReceipt, ReceiptsType } from 'src/types/ReceiptType';
const SupplierDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inventories = useSelector(inventorySelector);
  const userModel = useSelector(userModelSelector);
  const { pageTitle = '', typeTitle, onTitleClick } = location.state ?? {};
  const { supplier, isPendingGetSupplier } = useGetSupplierDetail(parseInt(id as string));
  const [getReceiptByCupplier, isPendingGetReceiptByCupplier] = useGetReceiptProductList();
  const [createActionHistory] = useCreateActionHistory();
  const [receipts, setReceipts] = useState<ReceiptsType[]>([]);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const [inventory, setInvevntory] = useState<number>(inventories[0].id);
  const handleBackPage = useCallback(() => {
    navigate(`${onTitleClick}`);
  }, [onTitleClick]);

  useEffect(() => {
    createActionHistory({ message: 'Màn hình chi tiết khách hàng' });
    getReceiptByCupplier({ storeId: userModel.storeId, inventoryId: inventory } as FilterReceipt).then((res) => {
      setReceipts(res.data);
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
        {isPendingGetSupplier && <Loading isLoading={isPendingGetSupplier} size={35} />}
        <Grid container item className="customer-detail-info" gap={3}>
          <p className="text-start title-2">Thông tin khách hàng</p>

          <Grid className="base-info" wrap="wrap" justifyContent={'space-between'} container gap={3} xs={12}>
            <TextField
              label="Tên nhà cung cấp"
              fullWidth
              disabled
              className="base-info-name"
              value={supplier?.name ? supplier?.name : ''}
            />

            <TextField
              label="Mã nhà cung cấp"
              fullWidth
              disabled
              className="base-info-code"
              value={supplier?.code ? supplier?.code : ''}
            />
            <TextField
              label="Địa chỉ"
              fullWidth
              disabled
              className="base-info-code"
              value={supplier?.address ? supplier?.address : ''}
            />
            <TextField
              label="Email"
              fullWidth
              disabled
              className="base-info-code"
              value={supplier?.email ? supplier?.email : ''}
            />

            <TextField
              type="number"
              fullWidth
              disabled
              label="Số điện thoại"
              className="base-info-code"
              value={supplier?.phone ? formatPhoneNumber(supplier?.phone) : ''}
            />
          </Grid>
        </Grid>
        <Grid className="customer-detail-action-history mt12" xs={12}>
          <Grid container justifyContent={'space-between'}>
            <p className="text-start title-2">Danh sách đơn đặt hàng</p>
            <div className="relative-block">
              <FormControl>
                <InputLabel id="select-inventory">Kho</InputLabel>
                <Select
                  label="Kho"
                  size="small"
                  labelId="select-inventory"
                  value={inventory}
                  onChange={(e) => setInvevntory(e.target.value as number)}
                >
                  {inventories?.map((inventory) => (
                    <MenuItem key={inventory.id} value={inventory?.id}>
                      {inventory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <CustomTable
            columns={ReceiptListColumn}
            pagination
            loading={isPendingGetReceiptByCupplier}
            className='mt12'
            metadata={metadata}
            rows={receipts?.map((selling) => ({ ...selling, key: selling.id }))}
          />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
export default memo(SupplierDetail);
