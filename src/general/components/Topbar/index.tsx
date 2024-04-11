import { Toolbar, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AppConstants } from '../../constants/AppConstants';
import { ChildFriendlyRounded } from '@mui/icons-material';

const AppBar = styled('div')(() => ({
  display: 'flex',
  position: 'absolute',
  zIndex: 1000,
  alignItems: 'center',
  justifyContent: 'between',
  // width: '100%',
  right: 0,
  left: 0,
  height: AppConstants.sidebarHeight,
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px 0 rgb(0 0 0 / 5%)',
}));
interface Props {
  children: React.ReactElement;
}
export const Topbar = ({ children }: Props) => {
  return (
    <AppBar>
      <Toolbar sx={{width: '100%' , justifyContent: 'space-between' }}>{children}</Toolbar>
    </AppBar>
  );
};
