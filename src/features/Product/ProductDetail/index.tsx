import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import { Add as AddIcon } from '@mui/icons-material';
import './productDetailStyle.scss';
import { Box, Button, TextField } from '@mui/material';
import axiosClient from 'src/api/axiosClient';
import { ProductAttributeType, ProductType } from 'src/types/Product';
import { useDispatch, useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { addAttribute, deleteAttribute, updateProductDetail } from './productDetailSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { productDetailSelector } from 'src/redux/selector';
import ConfirmModal from 'src/general/components/Modal/ConfirmModal';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import useUploadImage from 'src/hook/upLoadImage';
import AutoSlider from 'src/general/components/Slider';
import { replaceImage } from 'src/utils/variable';
import dayjs from 'dayjs';
import ColabTable from 'src/general/components/Table/ColabTable';
import { ProductDetailColumn, ProductDetailSubColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import OnceRow from 'src/general/components/Table/Product/OnceRow';
import ColabRow from 'src/general/components/Table/Product/ColabRow';
import SubTable from 'src/general/components/Table/ColabTable/SubTable';
import { PATH_PRODUCT } from 'src/general/constants/path';
import { updateProductEdit } from '../ProductCreating/productEditSlice';
import useDeleteProduct from 'src/hook/product/useDeleteProduct';
import { openAlert } from 'src/general/components/BaseLayout/alertSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageTitle, typeTitle, onTitleClick } = location.state || {};
  const [uploadImage, isPendingUploadImage] = useUploadImage();
  const [images, setimages] = React.useState<File[]>([]);
  const productDetail = useSelector(productDetailSelector);
  const [backupDetail, setBackupDetail] = React.useState<ProductType>({} as ProductType);
  const [newAttribute, setNewAttribute] = React.useState<ProductAttributeType>({} as ProductAttributeType);
  const { deleteProduct, isPendingDeleteProduct } = useDeleteProduct();
  const [categories, setCategories] = React.useState([]);
  const [attributeImage, setAttributeImage] = React.useState<File | null>(null);
  const [show, setShow] = React.useState('');
  const [deleteItem, setDeleteItem] = React.useState(0);
  const [edit, setEdit] = React.useState(false);
  const handleBackPage = React.useCallback(
    (link: string) => {
      navigate(`${link}`);
    },
    [onTitleClick]
  );
  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`product/detail/${id}`);
      dispatch(updateProductDetail(response.data));
      setBackupDetail(response.data);
      const categoriesResponse = await axiosClient.get(`product/categories/${id}`);
      setCategories(categoriesResponse.data);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  const handleDeleteAttribute = async () => {
    try {
      await axiosClient.put(`product-attributes/delete/${deleteItem}`);
      dispatch(deleteAttribute(deleteItem));
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };
  const handleCloseModal = () => {
    setDeleteItem(0);
    setShow('');
  };
  const listImage =
    productDetail.attributes && productDetail.imageLink && productDetail.imageLink !== ''
      ? [
          productDetail.imageLink,
          ...productDetail.attributes
            .map((attribute) => attribute.imageLink && attribute.imageLink)
            .filter((link) => link !== ''),
        ]
      : productDetail.imageLink !== ''
      ? [productDetail.imageLink]
      : [];
  console.log(listImage);
  const attributeRow = React.useMemo(
    () =>
      productDetail.attributes?.map((attribute) => {
        const quantity = attribute.inventoryList?.reduce((total, inventory) => total + inventory.quantity, 0);
        return {
          ...attribute,
          key: attribute.id,
          quantity: quantity,
          inventory: attribute?.inventoryList.length === 1 ? attribute?.inventoryList[0].inventory.name : '',
          subTableRow: attribute.inventoryList,
        };
      }),
    [productDetail]
  );
  const handleNavigateUpdateProduct = () => {
    dispatch(updateProductEdit(productDetail));
    navigate(PATH_PRODUCT.PRODUCT_CREATE_PATH, {
      state: {
        pageTitle: 'Quay về trang chi tiết sản phẩm',
        typeTitle: 'navigate',
        onTitleClick: PATH_PRODUCT.PRODUCT_DETAIL_PATH.replace('id', productDetail.id.toString()),
      },
    });
  };
  const handleDeleteProduct = () => {
    deleteProduct(Number(id))
      .then(() => {
        dispatch(openAlert({ message: 'Xóa hàng hóa thành công', type: 'success' }));
        navigate(PATH_PRODUCT.PRODUCT_LIST_PATH);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle={pageTitle ? pageTitle : 'Chi tiết sản phẩm'}
            typeTitle={typeTitle ? typeTitle : 'text'}
            onTitleClick={() => handleBackPage(onTitleClick)}
            buttonGroup={[
              { buttonTitle: 'Xóa', onClick: handleDeleteProduct, color: 'error', disable: isPendingDeleteProduct },
              {
                buttonTitle: 'Sửa sản phẩm',
                onClick: handleNavigateUpdateProduct,
              },
            ]}
          />
        }
      >
        <div className="content product-content">
          <h1 className="product-content-name">{productDetail.name}</h1>
          <Box className="product-content-overview">
            <div className="product-content-heading">
              <h4 className="title">Thông tin sản phẩm</h4>
            </div>
            <Box className="detail">
              <Box className="detail-attribute">
                <Box className="detail-attribute-row">
                  <TextField disabled value="Nhãn hiệu" />

                  <TextField disabled={!edit} fullWidth value={productDetail?.brand} />
                </Box>
                <Box className="detail-attribute-row">
                  <TextField disabled value="Loại sản phẩm" />
                  <TextField disabled={!edit} fullWidth value={productDetail?.category} />
                </Box>
                <Box className="detail-attribute-row">
                  <TextField disabled value="Ngày tạo" />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disabled
                      value={productDetail.createAt ? dayjs(productDetail.createAt) : null}
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
              <Box>
                <div className="product-image">
                  {listImage?.length !== 0 ? (
                    <AutoSlider images={listImage} interval={5000} />
                  ) : (
                    <img src={replaceImage} alt="replace" />
                  )}
                </div>
              </Box>
            </Box>
          </Box>
          <Box className="product-content-attributes">
            <div className="product-content-heading">
              <h4 className="title">Thuộc tính sản phẩm</h4>
            </div>
            <Box className="attributes-table">
              <ColabTable
                columns={ProductDetailColumn}
                rows={attributeRow}
                onceRow={(...rest: any) => <OnceRow {...rest} />}
                colabRow={(...rest: any) => <ColabRow {...rest} />}
                subTable={(subItem: ProductAttributeType) => (
                  <SubTable
                    pagination={false}
                    pageTitle="Hàng hóa theo kho"
                    columns={ProductDetailSubColumn}
                    rows={subItem.inventoryList?.map((item, index) => ({ ...item, key: index }))}
                  />
                )}
              />
            </Box>
          </Box>

          <ConfirmModal
            open={show === 'deleteAttribute'}
            onClose={handleCloseModal}
            onConfirm={handleDeleteAttribute}
          />
        </div>
      </BaseLayout>
    </div>
  );
}
