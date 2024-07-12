import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from 'src/general/components/Topbar';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import { PATH_AUTH } from 'src/general/constants/path';
import useConfirmRegister from 'src/hook/auth/useRegisterConfirm';

const RegisterFinish = () => {
  const navigate = useNavigate();
  const token = new URLSearchParams(useLocation().search).get('token');
  const { confirmRegister, ispendingConfirmRegister } = useConfirmRegister();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  useEffect(() => {
    token &&
      confirmRegister(token)
        .then(() => setShowMessage(true))
        .catch(() => setShowError(true));
  }, []);
  const handleBackDashboard = () => {
    navigate('/main/management/dashboard');
  };
  return (
    <div className="register-confirm">
      <div className="content">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Xin vui lòng xác nhận tài khoản bằng email để tiếp tục sử dụng hệ thống
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(RegisterFinish);
