import dayjs, { Dayjs } from 'dayjs';

export const getformatDate = (date: string) => {
  const oldDate = new Date(date);
  console.log(oldDate);
  
  const day = (oldDate.getDate() + 1).toString().padStart(2, '0');
  const month = (oldDate.getMonth() + 1).toString().padStart(2, '0');
  const year = oldDate.getFullYear();
  
  return `${day}/${month}/${year}`;
};

export const getDayjsFormatDate = (date: string) => {
  const response = dayjs(date);
  return response;
};

export const getformatDateTime = (date: string) => {
  const oldDate = new Date(date);
  const day = (oldDate.getDate() + 1).toString().padStart(2, '0');
  const month = (oldDate.getMonth() + 1).toString().padStart(2, '0');
  const year = oldDate.getFullYear();
  const hour = oldDate.getHours().toString().padStart(2, '0');
  const minute = oldDate.getMinutes().toString().padStart(2, '0');
  const second = oldDate.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};