import React from 'react';
import { KeyboardArrowLeft as KeyboardArrowLeftIcon, Person as PersonIcon } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import './topbarStyle.scss';
import { useSelector } from 'react-redux';
import { userModelSelector } from 'src/redux/selector';
import { useNavigate } from 'react-router';
import useAuth from 'src/hook/auth/useAuth';
import { PATH_STAFF } from 'src/general/constants/path';
type Variant = 'contained' | 'outlined' | 'text';
type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
interface Props {
  typeTitle?: string;
  onTitleClick?: () => void;
  pageTitle?: string;
  buttonGroup?: {
    buttonTitle: string;
    onClick: () => void;
    variant?: Variant;
    color?: Color;
    disable?: boolean;
  }[];
}
const CustomeTopbar = (props: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { logout } = useAuth();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userModel = useSelector(userModelSelector);
  const handleOpenDetailUser = () => {
    navigate(PATH_STAFF.STAFF_DETAIL_PATH.replace(':id', String(userModel.id)));
  };
  const handleLogout = () => {
    logout().then(() => {
      navigate('/login');
    });
  };
  return (
    <React.Fragment>
      {props.typeTitle !== 'navigate' ? (
        <p className="page-title">{props.pageTitle}</p>
      ) : (
        <p role="presentation" className="page-title back-page-btn" onClick={props.onTitleClick && props.onTitleClick}>
          <KeyboardArrowLeftIcon />
          {props.pageTitle}{' '}
        </p>
      )}
      <div className="btn-group">
        {props.buttonGroup &&
          props?.buttonGroup.map((button, index) => (
            <Button
              variant={button.variant || 'contained'}
              color={button.color ? button.color : 'primary'}
              className="add-btn"
              onClick={button.onClick}
              key={index}
              disabled={button.disable}
            >
              {button.buttonTitle}
            </Button>
          ))}
        <div>
          <Button onClick={handleClick}>
            <PersonIcon /> {userModel.name}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleOpenDetailUser}>Thông tin tài khoản</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </div>
      </div>
    </React.Fragment>
  );
};
export default React.memo(CustomeTopbar);
