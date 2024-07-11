import React, { memo, useState } from 'react';
import './style.scss';
import { Button, Divider, Grid, TextField } from '@mui/material';
import useAuth from 'src/hook/auth/useAuth';
import { LoginType } from 'src/types/auth.type';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLogin } from './authenSlice';
import { setCookie } from 'src/utils/Cookie';
import { updateAxiosAccessToken } from 'src/api/axiosClient';
import { PATH_AUTH, PATH_PRODUCT } from 'src/general/constants/path';
import useGetInventory from 'src/hook/inventory/useGetInventory';
import { Link } from 'react-router-dom';

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { getInventories } = useGetInventory();
  const { login, isPendingLogin } = useAuth();
  const handleLogin = () => {
    login({ username, password } as LoginType).then(async (res) => {
      dispatch(userLogin(res));
      updateAxiosAccessToken(res.token);
      await getInventories(res.storeId);
      setCookie('userInfo', encodeURIComponent(JSON.stringify({ ...res, userId: res.id })), 1);
      navigate('/main/management/dashboard');
    });
  };
  return (
    <Grid container justifyContent={'center'} alignItems={'center'} className="signin">
      <Grid className="signin-container">
        {/* <form
          onSubmit={(e) => {
            handleLogin;
            e.preventDefault();
          }}
        > */}
        <form action="" onSubmit={handleLogin}>
          <Grid container gap={3} flexDirection={'column'} className="signin-container-wrapper">
            <Grid container gap={2} flexDirection={'column'}>
              <p className="text-start">Tên đăng nhập</p>
              <TextField fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
            </Grid>
            <Grid container gap={2} flexDirection={'column'}>
              <p className="text-start">Mật khẩu</p>
              <TextField type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            </Grid>
            <Button variant="contained" disabled={isPendingLogin} type="submit" onClick={handleLogin}>
              Đăng nhập
            </Button>
          </Grid>
        </form>
        <Divider />
        <p className="mt-4 fz-14 text-start">
          Bạn chưa có tài khoản?{' '}
          <Link color="primary" to={PATH_AUTH.REGISTER}>
            Đăng ký ngay
          </Link>
        </p>
        {/* </form> */}
      </Grid>
    </Grid>
  );
};
export default memo(SignInScreen);
