import React from 'react';
import { Box, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface Props {
  title: string;
  fromTime : Dayjs | null;
  toTime : Dayjs | null;
  onSetDate: (fromTime: Dayjs | null, toTime : Dayjs|null) => void
}

const DateTimeField = (props: Props) => {
  return (
    <Box className="fillter-box-wrapper-item">
      {/* <form onSubmit={} onChange={handleSetDate}> */}
      <TextField className="filter-title" disabled value={props.title} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="fromTime"
          value={props.fromTime}
          maxDate={props.toTime}
          onChange={(value) => {
            props.onSetDate(value, props.toTime);
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="toTime"
          value={props.toTime}
          minDate={props.fromTime}
          onChange={(value) => {
            props.onSetDate(props.fromTime,value);
          }}
        />
      </LocalizationProvider>
      {/* </form> */}
    </Box>
  );
};

export default React.memo(DateTimeField);
