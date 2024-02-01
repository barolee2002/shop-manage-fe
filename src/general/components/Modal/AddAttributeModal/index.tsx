import React from 'react';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { ProductAttributeType, ProductType } from 'src/types/Product';
import { style } from 'src/utils/CustomStyle/StyleModal';
import './modalStyle.scss';
import axiosClient from 'src/api/axiosClient';
import { VisuallyHiddenInput } from 'src/utils/CustomStyle/StyleUploadButton';
interface Props {
  open: boolean;
  productId: number;
  onClose: () => void;
  size: string[];
  origin: string[];
  varialtion: string[];
  material: string[];
  changeAttribute: (title: string, value: any) => void;
  newAttribute: ProductAttributeType;
  onAdd: () => void;
  attributeImage: File | null;
  setAttributeImage: (image: File) => void;
}

export default function AddAttributeModal(props: Props) {
  const {
    open,
    onClose,
    newAttribute,
    changeAttribute,
    size,
    origin,
    varialtion,
    material,
    onAdd,
    attributeImage,
    setAttributeImage,
  } = props;

  // React.useEffect(() => {
  //   setImageLink(() => {
  //     return URL.createObjectURL(imageLink);
  //   });
  // }, [imageLink]);
  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} className="modal-wrapper">
        <Box sx={style}>
          <div className="modal-wrapper-headding">
            <p className="title">Thêm thuộc tính</p>
            <IconButton onClick={onClose}>
              <CloseIcon color="error" />
            </IconButton>
          </div>
          <Box className="modal-form">
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Kích cỡ</p>
              <Autocomplete
                disablePortal
                options={size}
                value={newAttribute.size || ''}
                inputValue={newAttribute.size || ''}
                onInputChange={(e, newValue) => {
                  changeAttribute('size', newValue);
                }}
                onChange={(e, value) => changeAttribute('size', value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Chất liệu</p>
              <Autocomplete
                disablePortal
                options={material}
                value={newAttribute.material || ''}
                inputValue={newAttribute.material || ''}
                onInputChange={(e, newValue) => {
                  changeAttribute('material', newValue);
                }}
                onChange={(e, value) => changeAttribute('material', value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Xuất xứ</p>
              <Autocomplete
                disablePortal
                options={origin}
                value={newAttribute.origin || ''}
                inputValue={newAttribute.origin || ''}
                onInputChange={(e, newValue) => {
                  changeAttribute('origin', newValue);
                }}
                onChange={(e, value) => changeAttribute('origin', value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Màu sắc</p>
              <Autocomplete
                disablePortal
                options={varialtion}
                value={newAttribute.variation || ''}
                inputValue={newAttribute.variation || ''}
                onInputChange={(e, newValue) => {
                  changeAttribute('variation', newValue);
                }}
                onChange={(e, value) => changeAttribute('variation', value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Hình ảnh</p>
              <Box className="attribute-wrapper-image">
                {/* <input type="file" /> */}
                <Button component="label" className="h-100 bd-radius-6">
                  {newAttribute.imageLink ? (
                    <img src={newAttribute.imageLink} className="attribute-wrapper-image-img" alt="product" />
                  ) : (
                    <React.Fragment>
                      {attributeImage ? (
                        <img
                          src={URL.createObjectURL(attributeImage)}
                          className="attribute-wrapper-image-img"
                          alt="product"
                        />
                      ) : (
                        <AddIcon />
                      )}
                    </React.Fragment>
                  )}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];
                      if (selectedFile) {
                        setAttributeImage(selectedFile);
                      }
                    }}
                  />
                </Button>
                {/* </input> */}
              </Box>
            </Box>
          </Box>
          <Button onClick={onAdd} variant="contained">
            Lưu
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
