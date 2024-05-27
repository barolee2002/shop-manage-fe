import React from 'react';
import { Box, Button, TextField, IconButton, Snackbar, Alert } from '@mui/material';
import { Search as SearchIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material';
import { StyledMenu } from 'src/utils/CustomStyle/StyleMenu';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
    children : React.ReactNode;
    onFilter : () => void;
}

const FilterButton = (props : Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleFilter = () => {
    props.onFilter();
    setAnchorEl(null);
  }
  return (
    <Box className="fillter-box">
      <Button
        fullWidth
        aria-describedby={id}
        variant="contained"
        className="content-wrapper-search-btn"
        onClick={handlePopoverOpen}
      >
        Bộ lọc
      </Button>
      <StyledMenu
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handlePopoverClose}
      >
        <Box className="fillter-box-wrapper">
          {props.children}
          <Button variant="contained" className="filter-btn" onClick={handleFilter}>
            Lọc
          </Button>
        </Box>
      </StyledMenu>
    </Box>
  );
};

export default React.memo(FilterButton);
