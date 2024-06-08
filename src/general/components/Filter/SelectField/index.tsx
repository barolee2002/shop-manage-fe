/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/named */

import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface options {
  value: any;
  name: string;
}

interface Props {
  title: string;
  value: any;
  options: options[];
  onChange?: (value: any) => void;
  initialValue?: any;
  disable?: boolean;
}

const SelectField = (props: Props) => {
  const { disable = false } = props;
  const handleChangeValue = (event: SelectChangeEvent) => {
    props.onChange&&props.onChange(event.target.value);
  };

  return (
    <Box className="fillter-box-wrapper-item" sx={{ whiteSpace: 'none' }}>
      <TextField className="filter-title" disabled value={props.title} />
      <Select
        disabled={disable}
        sx={{ width: '100%' }}
        defaultValue={props.value}
        value={props.value ? props.value : props.initialValue}
        onChange={handleChangeValue}
      >
        <MenuItem value={null as any}>
          Chọn <p style={{ textTransform: 'lowercase', marginLeft: '4px' }}>{props.title}</p>
        </MenuItem>
        {props.options?.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default React.memo(SelectField);
