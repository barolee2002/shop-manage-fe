import React from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Button, IconButton, Modal } from '@mui/material';
import { style } from 'src/utils/CustomStyle/StyleModal';
interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export default function ConfirmModal(props: Props) {
  const { open, onClose, onConfirm } = props;
  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <div className="close-btn">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="content">
            <p>Hành động không thể khôi phục, xác nhận thực hiện ?</p>
          </div>
          <div className="confirm-btns">
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={onConfirm}>Xác nhận</Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
