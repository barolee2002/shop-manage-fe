import { Role } from 'src/general/components/Field/CustomeTextField';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
;
export const isEmail: Role[] = [
  {
    pattern: EMAIL_REGEX,
    message: 'Vui lòng nhập đúng kiểu email',
  },
];
