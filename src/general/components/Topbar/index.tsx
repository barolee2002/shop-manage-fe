import { Toolbar, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AppConstants } from '../../constants/AppConstants';
import { ChildFriendlyRounded } from '@mui/icons-material';

const AppBar = styled('div')(() => ({
  display: 'flex',
  position: 'fixed',
  zIndex: 1000,
  alignItems: 'center',
  justifyContent: 'between',
  width: '100%',
  height: AppConstants.sidebarHeight,
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px 0 rgb(0 0 0 / 5%)',
}));
interface Props {
  children: React.ReactElement;
}
export const Topbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
