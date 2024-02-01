import React from 'react';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { ProductType } from 'src/types/Product';
import { styled } from '@mui/material/styles';
import './style.scss';
import axiosClient from 'src/api/axiosClient';
import { style } from 'src/utils/CustomStyle/StyleModal';
import { VisuallyHiddenInput } from 'src/utils/CustomStyle/StyleUploadButton';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });
interface Props {
  detail: ProductType;
  open: boolean;
  onClose: () => void;
  changeProductDetail: (title: string, value: any) => void;
  images: File[];
  setImage: (images: File[]) => void;
  onUpdate: () => void;
  categories: string[]
}
export default function UpdateProductDetailModal(props: Props) {
  const { detail, open = false, onClose, changeProductDetail,categories, images, setImage, onUpdate } = props;
  const [imagelinks, setImageLinks] = React.useState<string[]>([]);
  React.useEffect(() => {
    setImageLinks(() => {
      return images.map((image) => {
        return URL.createObjectURL(image);
      });
    });
  }, [images]);
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
                value={detail.code}
                onChange={(e) => changeProductDetail('code', e.target.value)}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Tên sản phẩm</p>
              <TextField
                required
                fullWidth
                value={detail.name}
                onChange={(e) => changeProductDetail('name', e.target.value)}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Nhãn hiệu</p>
              <TextField
                required
                fullWidth
                value={detail.brand}
                onChange={(e) => changeProductDetail('brand', e.target.value)}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Loại sản phẩm</p>
              <Autocomplete
                disablePortal
                options={categories}
                value={detail.category}
                renderInput={(params) => (
                  <TextField {...params} onChange={(e) => changeProductDetail('category', e.target.value)} />
                )}
              />
            </Box>
            <Box className="modal-form-item">
              <p className="modal-form-item-title">Thêm ảnh</p>
              <Box className="image-list">
                <React.Fragment>
                  <Box className="image-list-item">
                    {/* <input type="file" /> */}
                    <Button component="label" className="w-100 h-100 bd-radius-6">
                      <AddIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];
                          if (selectedFile) {
                            setImage([...images, selectedFile]);
                          }
                        }}
                      />
                    </Button>
                    {/* </input> */}
                  </Box>
                  {imagelinks?.map((link, index) => (
                    <Box className="image-list-item" key={index}>
                      <img src={link} alt="product" />
                    </Box>
                  ))}
                  {detail.imageLinks?.map((image, index) => (
                    <Box className="image-list-item" key={index}>
                      <img src={image} alt="product" />
                    </Box>
                  ))}
                </React.Fragment>
              </Box>
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
