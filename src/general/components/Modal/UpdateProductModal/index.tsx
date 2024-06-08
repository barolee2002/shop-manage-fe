import React from 'react';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { ProductType } from 'src/types/Product';
import './style.scss';
import { style } from 'src/utils/CustomStyle/StyleModal';
import BaseDropzone from '../../DropZone';

interface Props {
  detail: ProductType;
  open: boolean;
  onClose: () => void;
  onChangeAttribute: (attributeId: number, title: string, value: any) => void;
  onChangeProductDetail: (title: string, value: any) => void;
  onUpdate: () => void;
  onImage: (image: File | null) => void;
  categories: string[];
}
export default function UpdateProductModal(props: Props) {
  const {
    detail,
    open = false,
    onClose,
    onChangeProductDetail,
    onImage,
    categories,
    onUpdate,
    onChangeAttribute,
  } = props;

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} className="modal-wrapper">
        <Box sx={style}>
          <div className="modal-wrapper-headding">
            <p className="title">Thông tin sản phẩm</p>
            <IconButton onClick={onClose}>
              <CloseIcon color="error" />
            </IconButton>
          </div>
          <Box className="modal-form">
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Mã sản phẩm</p>
              <TextField
                required
                fullWidth
                disabled={detail.attributes && detail.attributes.length > 1}
                value={
                  detail.attributes && detail.attributes.length > 0
                    ? detail.attributes.length > 1
                      ? 'Hàng nhiều loại'
                      : detail.attributes[0]?.code
                    : 'No attributes available'
                }
                onChange={(e) => {
                  onChangeAttribute(detail.attributes[0].id, 'code', e.target.value);
                }}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Tên sản phẩm</p>
              <TextField
                required
                fullWidth
                value={detail.name}
                onChange={(e) => onChangeProductDetail('name', e.target.value)}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Nhãn hiệu</p>
              <TextField
                required
                fullWidth
                value={detail.brand}
                onChange={(e) => onChangeProductDetail('brand', e.target.value)}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Loại sản phẩm</p>
              <Autocomplete
                disablePortal
                options={categories}
                value={detail.category}
                renderInput={(params) => (
                  <TextField {...params} onChange={(e) => onChangeProductDetail('category', e.target.value)} />
                )}
              />
            </Box>
            <Box className="modal-form-item">
              <BaseDropzone
                typeImage="product"
                once
                parentCallback={onImage}
                isClear={true}
                parentImage={detail.imageLink}
              />
            </Box>
          </Box>
          <Button variant="contained" className="modal-wrapper-save-btn" onClick={onUpdate}>
            Lưu
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
