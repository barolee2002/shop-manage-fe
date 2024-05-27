import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface Props {
  title: string;
  date: Dayjs | null;
  disable?: boolean;
  onSetDate?: (date: Dayjs | null) => void;
}

const DateTimeField = (props: Props) => {
  const { disable = false } = props;
  return (
    <Grid className="fillter-box-wrapper-item">
      {/* <form onSubmit={} onChange={handleSetDate}> */}
      <TextField className="filter-title" disabled value={props.title} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={disable}
          sx={{ width: '100%' }}
          name="fromTime"
          value={props.date}
          onChange={(value) => {
            props.onSetDate && props.onSetDate(value);
          }}
        />
      </LocalizationProvider>
      {/* </form> */}
    </Grid>
  );
};

export default React.memo(DateTimeField);
