/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/named */

import React from 'react';
import { Box, TextField, MenuItem, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface options {
  Id?: any;
  Name?: string;
}

interface Props {
  title: string;
  value?: any;
  options?: options[] | any;
  onChange?: (value: any) => void;
  initialValue?: any;
  disable?: boolean;
}

const CustomeSelectField = (props: Props) => {
  const { disable = false, value, options, initialValue, title, onChange } = props;
  const handleChangeValue = (event: SelectChangeEvent) => {
    onChange && onChange(event.target.value);
  };

  return (
    <Box className="" sx={{ whiteSpace: 'none', minWidth: '180px' }}>
      <InputLabel id="select-item">{title}</InputLabel>
      <Select
        disabled={disable}
        sx={{ width: '100%' }}
        // label={title}
        defaultValue={value}
        value={value ? value : initialValue}
        labelId="select-item"
        onChange={handleChangeValue}
      >
        <MenuItem value={null as any}>
          Chọn <p style={{ textTransform: 'lowercase', marginLeft: '4px' }}>{title}</p>
        </MenuItem>
        {typeof options === 'object' &&
          options?.map((option: options, index: number) => (
            <MenuItem key={index} value={option?.Name}>
              {option?.Name}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
};

export default React.memo(CustomeSelectField);
