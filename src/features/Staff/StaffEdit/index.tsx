import { Box, Grid, InputAdornment, InputLabel, TextField } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import { PATH_STAFF } from 'src/general/constants/path';
import useCreateUser from 'src/hook/user/useRegisterUser';
import useUpdateUser from 'src/hook/user/useUpdateUser';
import { inventorySelector, staffEditSelector, userModelSelector } from 'src/redux/selector';
import { changeValueEditStaff } from './staffSlice';
import SelectField from 'src/general/components/Filter/SelectField';
import { staffRoles } from 'src/general/constants/utils.constants';
import './StaffEdit.style.scss';
import BaseDropzone from 'src/general/components/DropZone';
import useUploadImage from 'src/hook/upLoadImage';
import CustomeTextField from 'src/general/components/Field/CustomeTextField';
import { isEmail } from 'src/utils/validations';
import { AddressPlace } from 'src/types/utils';
import CustomeSelectField from 'src/general/components/Field/CustomeSelectField';
import { placeDataSelect } from 'src/utils/PlaceData/placeDataSelect';
import useCreateActionHistory from 'src/hook/useCreateActionHistory';
import getImageUrl from 'src/utils/getImageUrl';
import { NumericFormat } from 'react-number-format';

const StaffEdit = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inventories = useSelector(inventorySelector);
  const userModel = useSelector(userModelSelector);
  const staff = useSelector(staffEditSelector);
  const [uploadImage] = useUploadImage();
  const [image, setImage] = useState<File | null>(null);
  const { pageTitle, typeTitle, onTitleClick, typeFeature } = location.state ?? {};
  const [createActionHistory] = useCreateActionHistory();
  const [address, setAddress] = useState<AddressPlace>({} as AddressPlace);
  const handleBackPage = useCallback(() => {
    navigate(`${onTitleClick}`);
  }, [onTitleClick]);
  const { createStaff, isPendingCreateUser } = useCreateUser();
  const { updateUserInfo, isPendingUpdateUserInfo } = useUpdateUser();
  const handleSetAddress = (title: string, value: string) => {
    setAddress((prev: AddressPlace) => ({
      ...prev,
      [title]: value,
    }));
  };
  const handleUpoadImage = async () => {
    const response = image !== null ? await uploadImage(image) : staff.avatar ? staff.avatar : '';
    return response;
  };
  const handleCreateStaff = async () => {
    const link = await handleUpoadImage();
    if (image !== null && link === null) {
      throw new Error('loi tai anh');
    }
    link &&
      createStaff({ ...staff, storeId: userModel.storeId, avatar: link })
        .then((res) => {
          dispatch(openAlert({ message: 'Tạo nhân viên thành công', type: 'success' }));
          navigate(PATH_STAFF.STAFF_DETAIL_PATH.replace(':id', String(res.id)));
        })
        .catch((err) => {
          dispatch(openAlert({ message: `Tạo nhân viên thất bại,\n vui lòng thử lại sau`, type: 'error' }));
        });
  };
  console.log(image);

  const handleUpdateStaffInfo = async () => {
    const link = await handleUpoadImage();
    if (image !== null && link === null) {
      throw new Error('loi tai anh');
    }
    link &&
      updateUserInfo(staff.id, { ...staff, avatar: link })
        .then((res) => {
          dispatch(openAlert({ message: 'Cập nhập thông tin nhân viên thành công', type: 'success' }));
          navigate(PATH_STAFF.STAFF_DETAIL_PATH.replace(':id', String(res.id)));
        })
        .catch((err) => {
          dispatch(
            openAlert({ message: `Cập nhập thông tin nhân viên thất bại,\n vui lòng thử lại sau`, type: 'error' })
          );
        });
  };
  const handleChangeStaffInfo = (title: string, value: any) => {
    dispatch(changeValueEditStaff({ [title]: value }));
  };
  const districtsOptions = useMemo(() => {
    return placeDataSelect.find((place) => place?.Name === address.city)?.Districts;
  }, [address]);
  const wardOptions = useMemo(() => {
    return districtsOptions?.find((place) => place?.Name === address.districts)?.Wards;
  }, [address]);
  useEffect(() => {
    const addressOld = staff?.address?.split(', ');
    if (addressOld && addressOld.length === 4) {
      setAddress({
        city: addressOld[3],
        districts: addressOld[2],
        wards: addressOld[1],
        other: addressOld[0],
      });
    }
    if (addressOld && addressOld.length === 3) {
      setAddress({
        city: addressOld[2],
        districts: addressOld[1],
        wards: addressOld[0],
        other: '',
      });
    }

    createActionHistory({ message: 'Màn hình tạo nhân viên' });
  }, []);
  console.log(address);

  useEffect(() => {
    const userAddress = `${
      address?.other ? address?.other + ', ' : ''
    }${address?.wards}, ${address?.districts}, ${address?.city} `;
    handleChangeStaffInfo('address', userAddress);
  }, [address]);

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
                    buttonTitle: 'Tạo nhân viên',
                    onClick: handleCreateStaff,
                    disable: isPendingCreateUser,
                  },
                ]
              : [
                  { buttonTitle: 'Hủy', onClick: handleBackPage, color: 'error' },
                  {
                    buttonTitle: 'Cập nhập thông tin nhân viên',
                    onClick: handleUpdateStaffInfo,
                    disable: isPendingUpdateUserInfo,
                  },
                ]
          }
        />
      }
    >
      <Grid className="content staff-edit">
        <Grid container item className="info" gap={3} xs={12} lg={8}>
          <Grid className="base-info" wrap="wrap" justifyContent={'space-between'} container gap={3}>
            <Grid item container lg={8} gap={3}>
              <TextField
                label="Tên nhân viên"
                fullWidth
                className="base-info-name"
                value={staff?.name}
                onChange={(e) => handleChangeStaffInfo('name', e.target.value)}
              />
              <TextField
                label="Mã nhân viên"
                fullWidth
                className="base-info-code"
                value={staff?.code}
                onChange={(e) => handleChangeStaffInfo('code', e.target.value)}
              />
            </Grid>
            <Grid item lg={3}>
              <BaseDropzone
                typeImage="avatar"
                once
                imageKey={staff.id}
                parentCallback={(image: File) => setImage(image)}
                isClear={true}
                parentImage={image ? staff.avatar ?? getImageUrl(image) : ''}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            type="number"
            label="Số điện thoại"
            className="base-info-code"
            value={staff?.phone}
            onChange={(e) => handleChangeStaffInfo('phone', e.target.value)}
          />
          <Grid container>
            <SelectField
              title="Vị trí"
              value={staff?.role}
              options={staffRoles.map((role) => ({ value: role.value, name: role?.name }))}
              onChange={(value: number) => handleChangeStaffInfo('role', value)}
              //   initialValue={initialSupplier}
            />
            {staff.role === 'INVENTORY' && (
              <SelectField
                title="Kho"
                value={staff?.inventoryId}
                options={inventories.map((inventory) => ({ value: inventory.id, name: inventory.name }))}
                onChange={(value: number) => handleChangeStaffInfo('inventoryId', value)}
              />
            )}
          </Grid>
          <CustomeTextField
            label="Email nhân viên"
            fullWidth
            className="base-info-email"
            value={staff?.email}
            onChange={(e) => handleChangeStaffInfo('email', e.target.value)}
            roles={[...isEmail]}
          />
          <Grid container gap={2} wrap="wrap">
            <CustomeSelectField
              title="Thành phố"
              value={address?.city}
              onChange={(e: string) => handleSetAddress('city', e)}
              options={placeDataSelect}
            />
            <CustomeSelectField
              title="Huyện"
              value={address?.districts}
              onChange={(e: string) => handleSetAddress('districts', e)}
              options={districtsOptions}
            />
            <CustomeSelectField
              title="Thị trấn/ xã"
              value={address?.wards}
              onChange={(e: string) => handleSetAddress('wards', e)}
              options={wardOptions}
            />
            <div>
              <InputLabel id="other-address">Khác</InputLabel>

              <TextField
                label="Khác"
                value={address?.other}
                onChange={(e) => handleSetAddress('other', e.target.value)}
              />
            </div>
          </Grid>
          <TextField
            fullWidth
            label="Tên đăng nhập"
            className="base-info-code"
            value={staff?.username}
            onChange={(e) => handleChangeStaffInfo('username', e.target.value)}
          />
          <TextField
            label="Mật khẩu"
            fullWidth
            type="password"
            className="base-info-code"
            value={staff?.password}
            onChange={(e) => handleChangeStaffInfo('password', e.target.value)}
          />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
export default memo(StaffEdit);
