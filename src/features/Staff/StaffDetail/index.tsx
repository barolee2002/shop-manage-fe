import { Box, Grid, InputAdornment, InputLabel, TextField } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import { inventorySelector, userModelSelector } from 'src/redux/selector';
import BaseDropzone from 'src/general/components/DropZone';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';

import useGetUserDetail from 'src/hook/user/useGetUserDetail';
import Loading from 'src/general/components/Loading';
import { PATH_STAFF } from 'src/general/constants/path';
import { updateStaffEdit } from '../StaffEdit/staffSlice';
import { staffRoles } from 'src/general/constants/utils.constants';
import CustomeSelectField from 'src/general/components/Field/CustomeSelectField';
import './StaffDetail.styles.scss';
import CustomTable from 'src/general/components/Table/CustomeTable';
import { HistoryColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import useDeleteStaff from 'src/hook/user/useDeleteStaff';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';
const StaffDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inventories = useSelector(inventorySelector);
  const userModel = useSelector(userModelSelector);
  const { pageTitle = '', typeTitle, onTitleClick } = location.state ?? {};
  const { user, isPendingGetUser } = useGetUserDetail(parseInt(id as string));
  const [createActionHistory] = useCreateActionHistory();
  const { deleteStaff, isPendingDeleteStaff } = useDeleteStaff();
  const handleBackPage = useCallback(() => {
    navigate(`${onTitleClick}`);
  }, [onTitleClick]);

  useEffect(() => {
    createActionHistory({ message: 'Màn hình chỉnh sửa thông tin' });
  }, []);
  const handleEditInfo = () => {
    dispatch(updateStaffEdit(user));
    navigate(PATH_STAFF.STAFF_EDIT_PATH, {
      state: {
        pageTitle: 'Quay về trang thông tin nhân viên',
        typeTitle: 'navigate',
        onTitleClick: PATH_STAFF.STAFF_DETAIL_PATH.replace(':id', String(user.id)),
      },
    });
  };
  const handleDeleteStaff = () => {
    deleteStaff(Number(id))
      .then(() => {
        dispatch(openAlert({ message: 'Xóa nhân viên thành công', type: 'success' }));
        navigate(PATH_STAFF.STAFF_LIST_PATH);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <BaseLayout
      topbarChildren={
        <CustomeTopbar
          pageTitle={pageTitle ? pageTitle : 'Chi tiết nhân viên'}
          typeTitle={typeTitle ? typeTitle : 'text'}
          onTitleClick={handleBackPage}
          buttonGroup={[
            { buttonTitle: 'Xóa', onClick: handleDeleteStaff, color: 'error', disable: isPendingDeleteStaff },
            {
              buttonTitle: 'Chỉnh sửa thông tin',
              onClick: handleEditInfo,
              disable: isPendingGetUser,
            },
          ]}
        />
      }
    >
      <Grid className="content staff-detail">
        {isPendingGetUser && <Loading isLoading={isPendingGetUser} size={35} />}
        <Grid container item className="staff-detail-info" gap={3}>
          <Grid className="base-info" wrap="wrap" justifyContent={'space-between'} container gap={3} lg={8}>
            <Grid lg={5.8}>
              <TextField
                label="Tên nhân viên"
                fullWidth
                className="base-info-name"
                value={user?.name ? user?.name : ''}
              />
            </Grid>
            <Grid lg={5.8}>
              <TextField
                label="Mã nhân viên"
                fullWidth
                className="base-info-code"
                value={user?.code ? user?.code : ''}
              />
            </Grid>
            <Grid lg={5.8}>
              <TextField
                type="number"
                fullWidth
                label="Số điện thoại"
                className="base-info-code"
                value={user?.phone ? user?.phone : ''}
              />
            </Grid>
            <Grid lg={5.8}>
              <TextField
                title="Vị trí"
                fullWidth
                value={staffRoles.find((role) => role.value === user?.role)?.name}
                //   initialValue={initialSupplier}
              />
            </Grid>
            {user.role === 'INVENTORY' && (
              <Grid lg={5.8}>
                <CustomeSelectField
                  options={inventories.map((inventory) => ({ value: inventory.id, name: inventory.name }))}
                  title="Kho"
                  disable
                  value={user?.inventoryId}
                />
              </Grid>
            )}
            <Grid lg={5.8}>
              <TextField
                fullWidth
                label="Email nhân viên"
                className="base-info-email"
                value={user?.email ? user?.email : ''}
              />
            </Grid>
            <Grid lg={5.8}>
              <TextField
                label="Tên đăng nhập"
                fullWidth
                className="base-info-code"
                value={user?.username ? user?.username : ''}
              />
            </Grid>
          </Grid>
          <Grid item lg={3}>
            <BaseDropzone typeImage="avatar" once imageKey={user.id} isClear={true} parentImage={user.avatar} />
          </Grid>
        </Grid>
        <Grid className="staff-detail-action-history">
          <CustomTable
            columns={HistoryColumn}
            rows={user.actionHistories?.map((history) => ({ ...history, key: history.id }))}
          />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
export default memo(StaffDetail);
