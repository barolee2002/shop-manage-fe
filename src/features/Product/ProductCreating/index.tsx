import {
  Box,
  TextField,
  Tabs,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Tab,
  Autocomplete,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import './productCreatingStyle.scss';
import BaseDropzone from 'src/general/components/DropZone';
import { inventorySelector, productEditSelector, userModelSelector } from 'src/redux/selector';
import { ProductAttributeType, ProductType } from 'src/types/Product';
import useGetCategory from 'src/hook/useGetCategory';
import useBrand from 'src/hook/useGetBrand';
import { NumericFormat } from 'react-number-format';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { addAttributeEdit, changeAttributeEdit, changeValueEditProduct, updateProductEdit } from './productEditSlice';
import { initialInventoryCost, initialProduct, initialProductAttribute } from 'src/utils/initialValue';
import useUploadImage from 'src/hook/upLoadImage';
import getImageUrl from 'src/utils/getImageUrl';
import getImageFile from 'src/utils/getImageFile';
import useCreateProduct from 'src/hook/product/useCreateProduct';
import { PATH_PRODUCT } from 'src/general/constants/path';
import useUpdateProduct from 'src/hook/product/useUpdateProduct';

const ProductCreating = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userModel = useSelector(userModelSelector);
  const { pageTitle, typeTitle, onTitleClick, typeFeature } = location.state ?? {};
  const productEdit: ProductType = useSelector(productEditSelector);
  const [categories] = useGetCategory(userModel.storeId);
  const inventories = useSelector(inventorySelector);
  const [brands] = useBrand(userModel.storeId);
  const [updateProduct, isPendingUpdateProduct] = useUpdateProduct();
  const [createProduct, isPendingCreateProduct] = useCreateProduct();
  const [uploadImage, isPendingUploadImage] = useUploadImage();
  const [attribute, setAttribute] = React.useState<ProductAttributeType>(
    initialProductAttribute as ProductAttributeType
  );
  const [tabValue, setTabValue] = React.useState(0);
  const [attributeNames, setAttributeNames] = React.useState<string[]>([]);
  const handleBackPage = React.useCallback(() => {
    navigate(`${onTitleClick}`);
  }, [onTitleClick]);

  React.useEffect(() => {
    if (Object.keys(productEdit).length === 0 && productEdit.constructor === Object) {
      dispatch(updateProductEdit(initialProduct));
    }
  }, [productEdit]);

  React.useEffect(() => {
    productEdit.attributes && setAttribute(productEdit.attributes[tabValue]);
  }, [tabValue]);

  const handleAddOtherAttribute = () => {
    setAttribute(
      (prev: ProductAttributeType) =>
        ({ ...prev, otherAttribute: [...prev.otherAttribute, { name: '', value: '' }] }) as ProductAttributeType
    );
  };

  const handleAddInventory = () => {
    setAttribute(
      (prev: ProductAttributeType) =>
        ({ ...prev, inventoryList: [...prev.inventoryList, initialInventoryCost] }) as ProductAttributeType
    );
  };
  const handleSetOtherAttribute = (attributeIndex: number, title: string, value: string | null) => {
    setAttribute((prev: ProductAttributeType) => ({
      ...prev,
      otherAttribute: prev.otherAttribute.map((attribute, index) => {
        return index === attributeIndex ? { ...attribute, [title]: value } : attribute;
      }),
    }));
  };
  const handleSetInventory = (inventoryIndex: number, title: string, value: any) => {
    setAttribute((prev: ProductAttributeType) => ({
      ...prev,
      inventoryList: prev.inventoryList.map((inventory, index) => {
        return index === inventoryIndex ? { ...inventory, [title]: value } : inventory;
      }),
    }));
  };
  const handleChangeName = (value: string | null) => {
    setAttributeNames(() => {
      return value ? [...attributeNames, value] : attributeNames;
    });
  };
  const handleDeleteOtherAttribute = (indexNumber: number) => {
    setAttribute((prev: ProductAttributeType) => ({
      ...prev,
      otherAttribute: prev.otherAttribute.filter((_, index) => index !== indexNumber),
    }));
  };
  const handleDeleteInventory = (indexNumber: number) => {
    setAttribute((prev: ProductAttributeType) => ({
      ...prev,
      inventoryList: prev.inventoryList.filter((_, index) => index !== indexNumber),
    }));
  };
  const handleChangeAttribute = (title: string, value: any) => {
    setAttribute((prev: ProductAttributeType) => ({
      ...prev,
      [title]: value,
    }));
  };
  const handleAddAttribute = () => {
    dispatch(addAttributeEdit(initialProductAttribute));
  };
  const handleChangeTab = (value: number) => {
    dispatch(
      changeAttributeEdit({
        index: tabValue,
        attribute: attribute,
      })
    );
    setTabValue(value);
  };
  const fixDataPost = React.useMemo(
    () => async (productEdit: ProductType, attribute: ProductAttributeType) => {
      const link = productEdit.imageLink
        ? await uploadImage(await getImageFile(productEdit.imageLink, `${userModel.storeId}/${productEdit.name}`))
        : '';
      const attributes = await Promise.all(
        productEdit.attributes.map(async (attribute) => ({
          ...attribute,
          imageLink: attribute.imageLink
            ? await uploadImage(await getImageFile(attribute.imageLink, `${userModel.storeId}/${productEdit.name}`))
            : '',
        }))
      );

      const newData: ProductAttributeType = {
        ...attribute,
        imageLink: attribute.imageLink
          ? ((await uploadImage(
              await getImageFile(attribute.imageLink, `${userModel.storeId}/${productEdit.name}`)
            )) as string)
          : '',
      };
      const data = {
        ...productEdit,
        imageLink: link as string,
        storeId: userModel.storeId,
        attributes: attributes.map((oldAttribute, index) => {
          return index === tabValue ? newData : oldAttribute;
        }) as ProductAttributeType[],
      };
      return data;
    },
    [productEdit, attribute]
  );
  const handleUpdateProduct = async () => {
    const datapost = await fixDataPost(productEdit, attribute);
    updateProduct(datapost)
      .then((res: ProductType) => {
        dispatch(updateProductEdit(res));
        return res;
      })
      .then((res: ProductType) => navigate(PATH_PRODUCT.PRODUCT_DETAIL_PATH.replace(':id', res.id.toString())));
  };
  const handleCreateProduct = async () => {
    const datapost = await fixDataPost(productEdit, attribute);
    createProduct(datapost)
      .then((res: ProductType) => {
        dispatch(updateProductEdit(res));
        return res;
      })
      .then((res: ProductType) => navigate(PATH_PRODUCT.PRODUCT_DETAIL_PATH.replace(':id', res.id.toString())));
  };
  const handleChangeAttributeImage = React.useCallback((image: File) => {
    handleChangeAttribute('imageLink', getImageUrl(image));
  }, []);
  console.log(isPendingCreateProduct && isPendingUploadImage);

  return (
    <BaseLayout
      topbarChildren={
        <CustomeTopbar
          pageTitle={pageTitle ? pageTitle : 'Chi tiết sản phẩm'}
          typeTitle={typeTitle ? typeTitle : 'text'}
          onTitleClick={handleBackPage}
          buttonGroup={
            typeFeature === 'create'
              ? [
                  { buttonTitle: 'Hủy', onClick: handleBackPage, color: 'error' },
                  {
                    buttonTitle: 'Tạo sản phẩm',
                    onClick: handleCreateProduct,
                    disable: isPendingCreateProduct || isPendingUploadImage,
                  },
                ]
              : [
                  { buttonTitle: 'Hủy', onClick: handleBackPage, color: 'error' },
                  {
                    buttonTitle: 'Cập nhập sản phẩm',
                    onClick: handleUpdateProduct,
                    disable: isPendingUpdateProduct || isPendingUploadImage,
                  },
                ]
          }
        />
      }
    >
      <Box className="content">
        <Box className="product-base-inf">
          <div className="sub-header">
            <p className="sub-header-title">Thông tin cơ bản</p>
          </div>
          <Box className="product-inf">
            <Box className="product-inf-item">
              <Box className="product-inf-item-field">
                <TextField
                  fullWidth
                  placeholder="Nhập tên sản phẩm"
                  label="Tên sản phẩm"
                  value={productEdit.name || ''}
                  className="product-inf-item-field-input"
                  onChange={(e) => {
                    dispatch(changeValueEditProduct({ name: e.target.value }));
                  }}
                />
              </Box>
              <Box className="product-inf-item-field">
                <TextField
                  fullWidth
                  placeholder="Nhập mã sản phẩm"
                  label="Mã sản phẩm"
                  value={
                    productEdit.attributes && productEdit?.attributes.length === 1
                      ? productEdit.attributes[0].code
                      : 'Hàng nhiều loại' || ''
                  }
                  className="product-inf-item-field-input"
                  onChange={(e) => {
                    dispatch(changeValueEditProduct({ name: e.target.value }));
                  }}
                />
              </Box>
              <Box className="product-inf-item-field">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={categories}
                  fullWidth
                  value={productEdit.category || null}
                  onChange={(_, value) => {
                    dispatch(changeValueEditProduct({ category: value }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loại sản phẩm"
                      onChange={(e) => {
                        dispatch(changeValueEditProduct({ category: e.target.value }));
                      }}
                    />
                  )}
                />
              </Box>
              <Box className="product-inf-item-field">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={brands}
                  fullWidth
                  value={productEdit.brand || null}
                  onChange={(_, value) => {
                    dispatch(changeValueEditProduct({ brand: value }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Thương hiệu"
                      onChange={(e) => {
                        dispatch(changeValueEditProduct({ brand: e.target.value }));
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box className="product-inf-item">
              <BaseDropzone
                imageKey={tabValue}
                once
                parentImage={productEdit.imageLink ? productEdit.imageLink : ''}
                parentCallback={(image: File) => dispatch(changeValueEditProduct({ imageLink: getImageUrl(image) }))}
              />
            </Box>
          </Box>
        </Box>
        <Box className="product-attribute">
          <div className="sub-header">
            <p className="sub-header-title">Thiết lập mở rộng</p>
            <Button variant="outlined" onClick={handleAddAttribute}>
              <AddIcon fontSize="inherit" /> Thêm biến thể
            </Button>
          </div>
          <Box>
            <Tabs value={tabValue} aria-label="basic tabs example" onChange={(_, value) => handleChangeTab(value)}>
              {productEdit.attributes &&
                productEdit.attributes.map((_, index) => (
                  <Tab
                    label={`Biến thể ${index + 1}`}
                    key={index}
                    id={`simple-tab-${index}`}
                    aria-controls={`simple-tabpanel-${index}`}
                  />
                ))}
            </Tabs>
          </Box>

          <Box className="attribute">
            <Box className="attribute-item">
              <TextField
                placeholder="Nhập mã sản phẩm"
                value={attribute.code}
                onChange={(e) => handleChangeAttribute('code', e.target.value)}
              />
            </Box>
            <Box className="attribute-item">
              <BaseDropzone
                imageKey={tabValue}
                once
                parentImage={attribute.imageLink}
                parentCallback={handleChangeAttributeImage}
              />
            </Box>
          </Box>
          
          <Box className="extension-setup">
            <Box className="extension-setup-item">
              {attribute.otherAttribute &&
                attribute.otherAttribute.map((attribute, index) => (
                  <Box key={index} className="extension-setup-item-row">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={attributeNames}
                      isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
                      fullWidth
                      value={attribute.name ? attribute.name : ''}
                      onChange={(_, value: string | null) => {
                        handleSetOtherAttribute(index, 'name', value);
                      }}
                      sx={{ width: '40%' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tên thuộc tính"
                          onChange={(e) => {
                            handleChangeName(e.target.value);
                            handleSetOtherAttribute(index, 'name', e.target.value);
                          }}
                        />
                      )}
                    />
                    <TextField
                      value={attribute.value}
                      label="Giá trị thuộc tính"
                      onChange={(e) => handleSetOtherAttribute(index, 'value', e.target.value)}
                    />
                    <IconButton size="large" onClick={() => handleDeleteOtherAttribute(index)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                ))}
              <Button variant="outlined" onClick={handleAddOtherAttribute}>
                <AddIcon fontSize="inherit" /> Thêm thuộc tính
              </Button>
            </Box>
            <Box className="extension-setup-item">
              <Box className="extension-setup-item-row">
                <NumericFormat
                  thousandSeparator=","
                  customInput={TextField}
                  value={attribute.costPrice === 0 ? null : attribute.costPrice}
                  label="Giá nhập"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <p>đ</p>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChangeAttribute('costPrice', parseInt(e.target.value.replace(/,/g, '')))}
                />
                <NumericFormat
                  thousandSeparator=","
                  customInput={TextField}
                  value={attribute.sellPrice === 0 ? null : attribute.sellPrice}
                  label="Giá bán"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <p>đ</p>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChangeAttribute('sellPrice', parseInt(e.target.value.replace(/,/g, '')))}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
};

export default React.memo(ProductCreating);
