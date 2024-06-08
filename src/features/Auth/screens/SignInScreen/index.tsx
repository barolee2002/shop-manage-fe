import React, { memo, useState } from 'react';
import './style.scss';
import { Button, Grid, TextField } from '@mui/material';
import useAuth from 'src/hook/auth/useAuth';
import { LoginType } from 'src/types/auth.type';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLogin } from './authenSlice';
import { setCookie } from 'src/utils/Cookie';
import { updateAxiosAccessToken } from 'src/api/axiosClient';
import { PATH_PRODUCT } from 'src/general/constants/path';
import useGetInventory from 'src/hook/useGetInventory';

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
      navigate(PATH_PRODUCT.PRODUCT_LIST_PATH);
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
        <Grid container gap={3} flexDirection={'column'} className="signin-container-wrapper">
          <Grid container gap={2} flexDirection={'column'}>
            <p>Tên đăng nhập</p>
            <TextField fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
          </Grid>
          <Grid container gap={2} flexDirection={'column'}>
            <p>Tên đăng nhập</p>
            <TextField fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <Button variant="contained" disabled={isPendingLogin} type="submit" onClick={handleLogin}>
            Đăng nhập
          </Button>
        </Grid>
        {/* </form> */}
      </Grid>
    </Grid>
  );
};
export default memo(SignInScreen);
