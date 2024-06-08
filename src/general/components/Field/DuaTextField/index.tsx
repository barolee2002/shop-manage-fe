/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/named */

import React from 'react';
import { Box, Grid, TextField } from '@mui/material';

interface Props {
  title: string;
  value: any;
  onChange?: (value: any) => void;
  initialValue?: any;
  disable?: boolean;
}

const DuaTextField = (props: Props) => {
  const { disable = false } = props;
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <Box className="fillter-box-wrapper-item" sx={{ whiteSpace: 'none' }}>
      <TextField className="filter-title" disabled value={props.title} />

      <TextField
        disabled={disable}
        sx={{ width: '100%' }}
        defaultValue={props.value}
        value={props.value ? props.value : props.initialValue}
        onChange={(e) => handleChangeValue(e)}
      />
    </Box>
  );
};

export default React.memo(DuaTextField);
