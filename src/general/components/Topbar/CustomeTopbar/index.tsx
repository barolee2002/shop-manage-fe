import React from 'react';
import { KeyboardArrowLeft as KeyboardArrowLeftIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import './topbarStyle.scss';
type Variant = 'contained' | 'outlined' | 'text';
type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
interface Props {
  typeTitle?: string;
  onTitleClick?: () => void;
  pageTitle?: string;

  buttonGroup?: {
    buttonTitle: string;
    onClick: () => void;
    variant?: Variant;
    color?: Color;
    disable?: boolean;
  }[];
}
const CustomeTopbar = (props: Props) => {
  return (
    <React.Fragment>
      {props.typeTitle !== 'navigate' ? (
        <p className="page-title">{props.pageTitle}</p>
      ) : (
        <p role="presentation" className="page-title back-page-btn" onClick={props.onTitleClick && props.onTitleClick}>
          <KeyboardArrowLeftIcon />
          {props.pageTitle}{' '}
        </p>
      )}
      <div className="btn-group">
        {props.buttonGroup &&
          props?.buttonGroup.map((button, index) => (
            <Button
              variant={button.variant || 'contained'}
              color={button.color ? button.color : 'primary'}
              className="add-btn"
              onClick={button.onClick}
              key={index}
              disabled={button.disable}
            >
              {button.buttonTitle}
            </Button>
          ))}
      </div>
    </React.Fragment>
  );
};
export default React.memo(CustomeTopbar);
