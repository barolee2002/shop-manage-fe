import React, { memo } from 'react';
import { Box, TextField,InputAdornment  } from '@mui/material';
import { NumericFormat } from 'react-number-format';

interface Props {
  title: string;
  from: number;
  to: number;
  onSetRange: (from: number, to: number) => void;
}

const NumberRangeField = (props: Props) => {
  const { title, from, to, onSetRange } = props;
  return (
    <Box className="fillter-box-wrapper-item">
      {/* <form onSubmit={} onChange={handleSetDate}> */}
      <TextField className="filter-title" disabled value={title} />
      <NumericFormat
        thousandSeparator=","
        customInput={TextField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <p>đ</p>
            </InputAdornment>
          ),
        }}
        max={to}
        value={from === 0 && from ? null : from}
        onChange={(e) => onSetRange(parseInt(e.target.value.replace(/,/g, '')), to)}
      />
      <NumericFormat
        thousandSeparator=","
        customInput={TextField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <p>đ</p>
            </InputAdornment>
          ),
        }}
        min={from}
        value={to === 0 && to ? null : to}
        onChange={(e) => onSetRange(from, parseInt(e.target.value.replace(/,/g, '')))}
      />
    </Box>
  );
};

export default memo(NumberRangeField)