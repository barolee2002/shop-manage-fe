import React from 'react';

import { Button } from '@mui/material';
import './style.scss';
interface Props {
  onAdd: () => void;
  pageTitle: string;
  buttonTitle: string;
}
export default function ProductListTopbar(props: Props) {
  return (
    <React.Fragment>
      <p className="back-page-btn">{props.pageTitle}</p>
      <Button variant="contained" className="add-btn" onClick={props.onAdd}>
        {props.buttonTitle}
      </Button>
    </React.Fragment>
  );
}
