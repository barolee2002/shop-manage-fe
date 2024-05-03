import React from 'react';
import { Close as CloseIcon, DeleteForever as DeleteForeverIcon } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { ProductAttributeType } from 'src/types/Product';
import './style.scss';
import axiosClient from 'src/api/axiosClient';
import { style } from 'src/utils/CustomStyle/StyleModal';
import BaseDropzone from '../../DropZone';

interface Props {
  detail: ProductAttributeType;
  open: boolean;
  onClose: () => void;
  onChangeAttribute: (title: string, value: any) => void;
  onUpdate: () => void;
  onImage: (image: File | null) => void;
}
export default function AttributeModal(props: Props) {
  const { detail, open = false, onClose, onImage, onUpdate, onChangeAttribute } = props;
  const handleChangeOtherAttrbute = (key: number, title: string, value: string) => {
    onChangeAttribute(
      'otherAttribute',
      detail.otherAttribute.map((attribute, index) => {
        return index === key ? { ...attribute, [title]: value } : attribute;
      })
    );
  };
  const handleDeleteOtherAttribute = (key: number) => {
    onChangeAttribute(
      'otherAttribute',
      detail.otherAttribute.filter((attribute, index) => {
        return index !== key;
      })
    );
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} className="modal-wrapper attribute-modal">
        <Box sx={style}>
          <div className="modal-wrapper-headding">
            <p className="title">Thông tin sản phẩm {detail.productName}</p>
            <IconButton onClick={onClose}>
              <CloseIcon color="error" className="close-btn" />
            </IconButton>
          </div>
          <Box className="modal-form">
            <Box className="modal-form-item orther-attribute">
              <p className="modal-form-item-title">Mã sản phẩm</p>
              <TextField
                required
                fullWidth
                value={detail.code}
                onChange={(e) => {
                  onChangeAttribute('code', e.target.value);
                }}
              />
            </Box>
            <Box className="modal-form-item orther-attribute">
              <p className="modal-form-item-title">Thuộc tính khác</p>
              <Box className="orther-attribute">
                {detail?.otherAttribute?.map((attribute, index) => (
                  <Box key={index} className="orther-attribute-row">
                    <TextField
                      fullWidth
                      required
                      value={attribute.name}
                      onChange={(e) => handleChangeOtherAttrbute(index, 'name', e.target.value)}
                    />
                    <TextField
                      fullWidth
                      required
                      value={attribute.value}
                      onChange={(e) => handleChangeOtherAttrbute(index, 'value', e.target.value)}
                    />
                    <IconButton size="large" onClick={() => handleDeleteOtherAttribute(index)}>
                      <DeleteForeverIcon className="delete-btn" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="modal-form-item">
              <BaseDropzone
                typeImage="product attribute"
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
