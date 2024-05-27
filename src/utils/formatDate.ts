import dayjs, { Dayjs } from 'dayjs';

export const getformatDate = (date: string) => {
  const oldDate = new Date(date);
  const day = oldDate.getDay().toString().padStart(2, '0');
  const month = (oldDate.getMonth() + 1).toString().padStart(2, '0');
  const year = oldDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getDayjsFormatDate = (date: string) => {
  const response = dayjs(date);
  return response;
};
