import { Box, FormControl, Grid, InputAdornment, InputLabel, Menu, MenuItem, Select, TextField } from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import CustomTable from 'src/general/components/Table/CustomeTable';
import { Search as SearchIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material';
import { staffRoles } from 'src/general/constants/utils.constants';
import { useDebounce } from 'src/hook/useDebounce';
import { useSelector } from 'react-redux';
import { userModelSelector } from 'src/redux/selector';
import useGetUserPage from 'src/hook/user/useGetUserPage';
import { StaffTableColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import { UserType } from 'src/types/user.type';
import { useNavigate } from 'react-router';
import { PATH_STAFF } from 'src/general/constants/path';
import 'src/utils/screenBaseStyle/baseScreenStyle.scss';
import './StaffManament.style.scss';
import { useDispatch } from 'react-redux';
import { updateStaffEdit } from '../StaffEdit/staffSlice';

const StaffManament = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState<string>('');
  const searchValue = useDebounce(searchString);
  const userModel = useSelector(userModelSelector);
  const [role, setRole] = useState<string>('');
  const [page, setPage] = useState(1);
  // const { fileWorkPoints, isPendingGetFileWorkPoints, reFetchGetFileWorkPoints } = useGetWorkPoints(userModel.storeId)

  const [pageSize, setPageSize] = useState(10);
  const { staffs, metadata, isPendingGetUsers, reFetchGetStaffs } = useGetUserPage(userModel.storeId);
  useEffect(() => {
    reFetchGetStaffs(searchValue, role, page, pageSize);
  }, [searchValue, role, page, pageSize]);
  const handleChangPage = (_: any, value: number) => {
    setPage(value);
  };
  const handleAddStaff = () => {
    dispatch(updateStaffEdit({} as UserType));
    navigate(PATH_STAFF.STAFF_EDIT_PATH, {
      state: {
        pageTitle: 'Quay về trang danh sách nhân viên',
        typeTitle: 'navigate',
        onTitleClick: PATH_STAFF.STAFF_LIST_PATH,
        typeFeature: 'create',
      },
    });
  };
  const handleNavigateDetail = (id: number) => {
    navigate(PATH_STAFF.STAFF_DETAIL_PATH.replace(':id', String(id)), {
      state: {
        pageTitle: 'Quay về trang danh sách nhân viên',
        typeTitle: 'navigate',
        onTitleClick: PATH_STAFF.STAFF_LIST_PATH,
      },
    });
  };
  const handleExport = () => {
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = `http://localhost:8080/user/export-work-points`;

    // Add the storeId as a hidden input
    const inputStoreId = document.createElement('input');
    inputStoreId.type = 'hidden';
    inputStoreId.name = 'storeId';
    inputStoreId.value = userModel.storeId?.toString();
    form.appendChild(inputStoreId);

    // Add the time as a hidden input
    const inputTime = document.createElement('input');
    inputTime.type = 'hidden';
    inputTime.name = 'time';
    inputTime.value = "MONTH";
    form.appendChild(inputTime);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };
  return (
    <div className="list">
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle="Danh sách Nhân viên"
            buttonGroup={[
              { buttonTitle: 'Xuất file chấm công', onClick: handleExport},
              { buttonTitle: 'Tạo nhân viên', onClick: handleAddStaff },
            ]}
          />
        }
      >
        <Box className="content staff-list">
          
          <Box className="content-wrapper">
            <Grid container wrap="wrap" gap={4} className="content-wrapper-search">
              <Grid item container gap={4} xs={12} lg={7}>
                <p className="title-2">Nhân viên</p>
                <Grid lg={9}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Tìm kiếm theo mã hoặc tên nhân viên"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      setSearchString(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} gap={4} lg={2.5} justifyContent={'flex-end'}>
                <div className="relative-block">
                  <FormControl>
                    <InputLabel id="select-staff-role">Vai trò</InputLabel>
                    <Select
                      label="Vai trò"
                      size="small"
                      fullWidth
                      labelId="select-staff-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value="">Vị trí nhân viên</MenuItem>
                      {staffRoles?.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <CustomTable
              className="content-wrapper-table"
              columns={StaffTableColumn}
              onChangePage={handleChangPage}
              loading={isPendingGetUsers}
              rows={staffs.map((staff) => ({ ...staff, key: staff.id }))}
              onRowClick={(item: UserType) => handleNavigateDetail(item.id)}
              pagination
              metadata={metadata}
            />
          </Box>
        </Box>
      </BaseLayout>
    </div>
  );
};

export default memo(StaffManament);
