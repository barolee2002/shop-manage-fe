import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import {  Add as AddIcon } from '@mui/icons-material';
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
import { uploadImage } from 'src/utils/upLoadImage';
import AutoSlider from 'src/general/components/Slider';
import { replaceImage } from 'src/utils/variable';
import dayjs from 'dayjs';
import ColabTable from 'src/general/components/Table/ColabTable';
import { ProductDetailColumn, ProductDetailSubColumn } from 'src/general/components/Table/TableColumn/TableColumns';
import OnceRow from 'src/general/components/Table/Product/OnceRow';
import ColabRow from 'src/general/components/Table/Product/ColabRow';
import SubTable from 'src/general/components/Table/ColabTable/SubTable';

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageTitle, typeTitle, onTitleClick } = location.state;

  const [images, setimages] = React.useState<File[]>([]);
  const [openAddAttribute, setOpenAddAttribute] = React.useState(false);
  const productDetail = useSelector(productDetailSelector);
  const [backupDetail, setBackupDetail] = React.useState<ProductType>({} as ProductType);
  const [newAttribute, setNewAttribute] = React.useState<ProductAttributeType>({} as ProductAttributeType);
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
  const handleOpenAddAttributeModal = () => {
    setOpenAddAttribute(true);
  };
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
        ...productDetail,
      });
      dispatch(updateProductDetail(response.data));
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
        imageLink: imageLink,
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
  };
  const handleCloseEdit = () => {
    setEdit(false);
    dispatch(updateProductDetail(backupDetail));
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
        const maxCostPrice = attribute.inventoryList?.reduce((max, inventory) => {
          return max < inventory.costPrice ? (max = inventory.costPrice) : max;
        }, 0);
        const minCostPrice = attribute.inventoryList?.reduce((max, inventory) => {
          return max > inventory.costPrice ? (max = inventory.costPrice) : max;
        }, 1000000000000000);
        const maxSellPrice = attribute.inventoryList?.reduce((max, inventory) => {
          return max < inventory.sellPrice ? (max = inventory.sellPrice) : max;
        }, 0);
        const minSellPrice = attribute.inventoryList?.reduce((max , inventory) => {
          return max > inventory.sellPrice ? (max = inventory.sellPrice) : max;
        }, 100000000000000);
        // const sellPrice = attribute.inventoryList?.reduce((total, inventory) => total + inventory.sellPrice, 0);
        return {
          ...attribute,
          key: attribute.id,
          quantity: quantity,
          inventory: attribute?.inventoryList.length === 1? attribute?.inventoryList[0].inventory.name : '',
          subTableRow: attribute.inventoryList,
          costPrice: maxCostPrice === minCostPrice ? maxCostPrice : `${minCostPrice} - ${maxCostPrice}`,
          sellPrice: maxSellPrice === minSellPrice ? maxSellPrice : `${minSellPrice} - ${maxSellPrice}`,
        };
      }),
    [productDetail]
  );
  return (
    <div>
      <BaseLayout
        topbarChildren={
          <CustomeTopbar
            pageTitle={pageTitle ? pageTitle : 'Chi tiết sản phẩm'}
            typeTitle={typeTitle ? typeTitle : 'text'}
            onTitleClick={() => handleBackPage(onTitleClick)}
            buttonGroup={
              !edit
                ? [
                    { buttonTitle: 'Xóa', onClick: () => {} },
                    {
                      buttonTitle: 'Sửa sản phẩm',
                      onClick: () => {
                        setEdit(true);
                      },
                    },
                  ]
                : [
                    { buttonTitle: 'Hủy', onClick: handleCloseEdit, color: 'error' },
                    { buttonTitle: 'Cập nhập sản phẩm', onClick: handleUpdateProduct },
                  ]
            }
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
                  {/* <TextField fullWidth value={getformatDate(productDetail?.createAt)} /> */}
                  {/* <p>: {getformatDate(productDetail.createAt)}</p> */}
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
              <Button onClick={handleOpenAddAttributeModal} startIcon={<AddIcon />}>
                Thêm thuộc tính
              </Button>
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
