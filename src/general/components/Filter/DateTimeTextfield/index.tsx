import React from 'react';
import { Box, Button, TextField } from '@mui/material';
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

const DateTimeTextField = (props: Props) => {
  // const handleSetDate ()
  // React.useEffect(() => {
  //   props.onSetDate(fromTime, toTime);
  // }, [fromTime, toTime]);
  const handleSetDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(e.currentTarget); // Create a new FormData object from the form element
    const fromTime = formData.get('fromTime'); // Get the value of the 'fromTime' field
    const toTime = formData.get('toTime');
    props.onSetDate( new Dayjs(fromTime?.toString()), new Dayjs(toTime?.toString()));
    console.log('From Time:', fromTime);
    console.log('To Time:', toTime);
  };
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

export default React.memo(DateTimeTextField);
