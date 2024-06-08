import { TextField } from '@mui/material';
import { memo, useMemo, useState } from 'react';
import { LeakRemoveTwoTone } from '@mui/icons-material';

export type Role = {
  pattern: RegExp;
  message: string;
};
interface Props {
  value?: any;
  onChange?: (value: any) => void;
  label?: string;
  fullWidth?: boolean;
  required?: boolean;
  roles?: Role[];
  className?: string;
}
const CustomeTextField = (props: Props) => {
  const [checkValue, setCheckValue] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);
  const { label = '', fullWidth = false, value, className = '', roles = [], required = false, onChange } = props;
  const checkError = useMemo(() => {
    const check = roles?.filter((role) => role.pattern.test(checkValue));
    console.log(check);
    
    if (!check.length && checkValue) {
      return true;
    }
    return false;
  }, [checkValue]);

  return (
    <div className={fullWidth ? 'w-100' : ''}>
      <TextField
        label={label}
        error={checkError}
        required={required}
        fullWidth={fullWidth}
        value={value}
        className={className}
        onFocus={() => setShow(false)}
        onBlur={() => setShow(true)}
        onChange={(e) => {
          setCheckValue(e.target.value);
          onChange && onChange(e);
        }}
      />
      {show && (
        <>
          {roles?.map((role) => (
            <p key={role.message} className="error-validate">
              {role.pattern.test(checkValue) ? '' : role.message}
            </p>
          ))}
        </>
      )}
    </div>
  );
};
export default memo(CustomeTextField);
