import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import { ArrowBack as ArrowBackIcon, Add as AddIcon } from '@mui/icons-material';
import './style.scss';
import { Box, Button } from '@mui/material';
import axiosClient from 'src/api/axiosClient';
import { ProductAttributeType, ProductType } from 'src/types/Product';
import { getformatDate } from 'src/utils/formatDate';
import AutoSlider from 'src/general/components/Slider';
import CollapsibleTable from 'src/general/components/CollabTable';
import { useDispatch , useSelector } from 'react-redux';
import { addAttribute, deleteAttribute, updateProductDetail } from './productDetailSlice';

import { productDetailSelector } from 'src/redux/selector';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from 'src/utils/firebase';
import UpdateProductDetailModal from 'src/general/components/Modal/UpdateProductModal';
import AddAttributeModal from 'src/general/components/Modal/AddAttributeModal';
import ConfirmModal from 'src/general/components/Modal/ConfirmModal';
const uploadImage = async (file: File) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, 'images/' + file.name);

  try {
    // Tải ảnh lên Firebase Storage
    await uploadBytes(storageRef, file);

    // Lấy URL tải xuống của ảnh
    const downloadURL = await getDownloadURL(storageRef);

    // Trả về URL ảnh để sử dụng
    return downloadURL;
  } catch (error) {
    // Xử lý lỗi tải ảnh
    console.log('Lỗi tải ảnh:', error);
    return null;
  }
};
export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refesh, setRefesh] = React.useState(0);
  const [detail, setDetail] = React.useState<ProductType>({} as ProductType);
  const [open, setOpen] = React.useState(false);
  const [images, setimages] = React.useState<File[]>([]);
  const [openAddAttribute, setOpenAddAttribute] = React.useState(false);
  const productDetail = useSelector(productDetailSelector);
  const [newAttribute, setNewAttribute] = React.useState<ProductAttributeType>({} as ProductAttributeType);
  const [size, setSize] = React.useState([]);
  const [origin, setOrigin] = React.useState([]);
  const [varialtion, setVariation] = React.useState([]);
  const [material, setMaterial] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [attributeImage, setAttributeImage] = React.useState<File | null>(null);
  const [show, setShow] = React.useState('');
  const [deleteItem, setDeleteItem] = React.useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setimages([]);
    setDetail(productDetail);
    setOpen(false);
  };
  const handleBackPage = () => {
    navigate('/admin/products');
  };
  const handleOpenAddAttributeModal = () => {
    setOpenAddAttribute(true);
  };
  const handleCloseAddAttributeModal = () => {
    setOpenAddAttribute(false);
    setNewAttribute({} as ProductAttributeType);
    setAttributeImage(null);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`product/detail/${id}`);
        dispatch(updateProductDetail(response.data));
        setDetail(response.data);
        const sizeResponse = await axiosClient.get(`product-attributes/size/${id}`);
        setSize(sizeResponse.data);
        const originResponse = await axiosClient.get(`product-attributes/origin/${id}`);
        setOrigin(originResponse.data);
        const materialResponse = await axiosClient.get(`product-attributes/material/${id}`);
        setMaterial(materialResponse.data);
        const variationResponse = await axiosClient.get(`product-attributes/variation/${id}`);
        setVariation(variationResponse.data);
        const categoriesResponse = await axiosClient.get(`product/categories/${id}`);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [refesh]);
  const changeProductDetail = (title: string, value: any) => {
    setDetail((prev) => {
      return {
        ...prev,
        [title]: value,
      };
    });
  };
  const handleUpdateProduct = async () => {
    const listLinks = [] as string[];
    for (const image of images || []) {
      const link = await uploadImage(image);
      if (link !== null) {
        listLinks.push(link);
      }
    }
    try {
      const response = await axiosClient.put(`product/updating/${id}`, {
        ...detail,
        imageLinks: [...detail.imageLinks, ...listLinks],
      });
      dispatch(updateProductDetail(response.data));
      handleClose();
      setRefesh(refesh + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteAttribute = async () => {
    try {
      await axiosClient.put(`product-attributes/delete/${deleteItem}`);
      dispatch(deleteAttribute(deleteItem));
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };
  const changeAttribute = (title: string, value: any) => {
    setNewAttribute({
      ...newAttribute,
      [title]: value,
    });
  };
  const handleAddAttribute = async () => {
    let imageLink = '';
    if (attributeImage !== null) {
      const link = await uploadImage(attributeImage);
      if (link !== null) {
        imageLink = link;
        setNewAttribute({
          ...newAttribute,
          imageLink: link,
        });
      }
    }

    try {
      const response = await axiosClient.post(`product-attributes/creating`, {
        ...newAttribute,
        productId: id,
        imageLink: imageLink
      });
      dispatch(addAttribute(response.data));
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdateAttribute = async () => {
    if (attributeImage !== null) {
      const link = await uploadImage(attributeImage);
      if (link !== null) {
        setNewAttribute({
          ...newAttribute,
          imageLink: link,
        });
      }
    }
    try {
      const response = await axiosClient.put(`product-attributes/updating/${newAttribute.id}`, {
        ...newAttribute,
        productId: id,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEditAttribute = (attribute: ProductAttributeType) => {
    setNewAttribute(attribute);
    setOpenAddAttribute(true);
  };
  const handleCloseModal = () => {
    setDeleteItem(0);
    setShow('');
  }
  return (
    <div>
      <BaseLayout>
        <div className="product-detail">
          <div className="headding">
            <Button className="back-page-btn" onClick={handleBackPage}>
              <ArrowBackIcon />
              Quay lại trang danh sách sản phẩm
            </Button>
            <div className="action">
              <Button variant="outlined" color="error" className="action-btn">
                Xóa
              </Button>
              <Button variant="outlined" className="action-btn" onClick={handleOpen}>
                Sửa sản phẩm
              </Button>
            </div>
          </div>
          <div className="content product-content">
            <h1 className="product-content-name">{productDetail.name}</h1>
            <Box className="product-content-overview">
              <div className="product-content-heading">
                <h4 className="title">Thông tin sản phẩm</h4>
              </div>
              <Box className="detail">
                <Box className="detail-attribute">
                  <Box className="attribute-row">
                    <p>Mã sản phẩm</p>
                    <p>: {productDetail.code}</p>
                  </Box>
                  <Box className="attribute-row">
                    <p>Nhãn hiệu</p>
                    <p>: {productDetail.brand}</p>
                  </Box>
                  <Box className="attribute-row">
                    <p>Loại sản phẩm</p>
                    <p>: {productDetail.category}</p>
                  </Box>
                  <Box className="attribute-row">
                    <p>Ngày tạo</p>
                    <p>: {getformatDate(productDetail.createAt)}</p>
                  </Box>
                </Box>
                <Box>
                  <div className="product-image">
                    {productDetail.imageLinks?.length !== 0 && (
                      <AutoSlider images={productDetail.imageLinks} interval={5000} />
                    )}
                  </div>
                </Box>
              </Box>
            </Box>
            <Box className="product-content-attributes">
              <div className="product-content-heading">
                <h4 className="title">Thuộc tính sản phẩm</h4>
                <Button onClick={handleOpenAddAttributeModal} startIcon={<AddIcon />}>
                  Thêm thuộc tính
                </Button>
              </div>
              <Box className="attributes-table">
                <CollapsibleTable
                  rows={productDetail.attributes}
                  onDeleteAttribute={(id: number) => {
                    setDeleteItem(id);
                    setShow('deleteAttribute');
                  }}
                  onEditAttribute={(attribute: ProductAttributeType) => {
                    navigate(`attribute/${attribute.id }`)
                  }}
                />
              </Box>
            </Box>
          </div>
        </div>
      </BaseLayout>
      <UpdateProductDetailModal
        detail={detail}
        open={open}
        onClose={handleClose}
        changeProductDetail={(title: string, value: string) => changeProductDetail(title, value)}
        images={images}
        setImage={(images: File[]) => setimages(images)}
        onUpdate={handleUpdateProduct}
        categories={categories}
      />
      <AddAttributeModal
        open={openAddAttribute}
        productId={detail.id}
        onClose={handleCloseAddAttributeModal}
        newAttribute={newAttribute}
        changeAttribute={(title: string, value: any) => changeAttribute(title, value)}
        size={size}
        varialtion={varialtion}
        material={material}
        origin={origin}
        onAdd={handleAddAttribute}
        attributeImage={attributeImage}
        setAttributeImage={(image: File) => setAttributeImage(image)}
      />
      <ConfirmModal open={show === 'deleteAttribute'} onClose={handleCloseModal} onConfirm={handleDeleteAttribute}/>
    </div>
  );
}
