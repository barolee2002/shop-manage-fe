/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/named */

import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  title: string;
  options: string[];
  onChange: (value: string) => void;
}

const DateTimeTextField = (props: Props) => {
  const [selectedValue, setSelectedValue] = React.useState('');
  React.useEffect(() => {
    props.onChange(selectedValue);
  }, [selectedValue]);
  const handleChangeValue = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };
  return (
    <Box className="fillter-box-wrapper-item">
      <TextField className="filter-title" disabled value={props.title} />
      <Select value={selectedValue} onChange={handleChangeValue}>
        <MenuItem value="">
          Chọn <p style={{ textTransform: 'lowercase' }}>{props.title}</p>
        </MenuItem>
        {props.options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default React.memo(DateTimeTextField);
