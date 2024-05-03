import { Box, TextField, Tabs, Tab, Autocomplete, Button, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { BaseLayout } from 'src/general/components/BaseLayout';
import CustomeTopbar from 'src/general/components/Topbar/CustomeTopbar';
import './productCreatingStyle.scss';
import BaseDropzone from 'src/general/components/DropZone';
import { productEditSelector } from 'src/redux/selector';
import { ProductAttributeType, ProductType } from 'src/types/Product';
import useCategory from 'src/hook/useGetCategory';
import { testuser } from 'src/utils/test';
import useBrand from 'src/hook/useGetBrand';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface OtherAttributes {
  name: string;
  value: string;
}
const ProductCreating = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageTitle, typeTitle, onTitleClick } = location.state;
  const productEdit = useSelector(productEditSelector);
  const [categories, isPendingGetCategories] = useCategory(testuser.storeId);
  const [brands, isPendingGetBrand] = useBrand(testuser.storeId);
  const [ortherAttributes, setOtherAttributes] = React.useState<OtherAttributes[]>([{ name: '', value: '' }]);
  const [tabValue, setTabValue] = React.useState(0);
  const [attributeNames, setAttributeNames] = React.useState<string[]>([]);
  const handleBackPage = React.useCallback(() => {
    navigate(`${onTitleClick}`);
  }, [onTitleClick]);
  React.useEffect(() => {
    
    productEdit.attributes && setOtherAttributes(productEdit.attributes[tabValue].otherAttribute);
  }, [productEdit]);
  const handleCreatOrUpdateProduct = () => {};
  const handleAddOtherAttribute = () => {
    setOtherAttributes([...ortherAttributes, { name: '', value: '' }]);
  };
  const handleSetOtherAttribute = (attributeIndex: number, title: string, value: string | null) => {
    setOtherAttributes(() => {
      return ortherAttributes.map((attribute, index) => {
        return index === attributeIndex ? { ...attribute, [title]: value } : attribute;
      });
    });
  };
  const handleChangeName = (value: string | null) => {
    setAttributeNames(() => {
      return value ? [...attributeNames, value] : attributeNames;
    });
  };
  return (
    <BaseLayout
      topbarChildren={
        <CustomeTopbar
          pageTitle={pageTitle ? pageTitle : 'Chi tiết sản phẩm'}
          typeTitle={typeTitle ? typeTitle : 'text'}
          onTitleClick={handleBackPage}
          buttonGroup={[
            { buttonTitle: 'Hủy', onClick: handleBackPage, color: 'error' },
            { buttonTitle: 'Cập nhập sản phẩm', onClick: handleCreatOrUpdateProduct },
          ]}
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
                  value={productEdit.name}
                  className="product-inf-item-field-input"
                />
              </Box>
              <Box className="product-inf-item-field">
                <TextField
                  fullWidth
                  placeholder="Nhập mã sản phẩm"
                  label="Mã sản phẩm"
                  value={
                    productEdit.attributes && productEdit?.attributes.length === 1 ? productEdit.attributes[0].code : ''
                  }
                  className="product-inf-item-field-input"
                />
              </Box>
              <Box className="product-inf-item-field">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={categories}
                  fullWidth
                  value={productEdit.category}
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} label="Loại sản phẩm" />}
                />
              </Box>
              <Box className="product-inf-item-field">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={brands}
                  fullWidth
                  value={productEdit.brand}
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} label="Thương hiệu" />}
                />
              </Box>
            </Box>
            <Box className="product-inf-item">
              <BaseDropzone />
            </Box>
          </Box>
        </Box>
        <Box className="product-attribute">
          <div className="sub-header">
            <p className="sub-header-title">Thiết lập mở rộng</p>
            <Button variant="outlined">
              <AddIcon /> Thêm biến thể
            </Button>
          </div>
          <Box>
            <Tabs value={tabValue} aria-label="basic tabs example">
              {productEdit.attributes &&
                productEdit.attributes.map((attribute, index) => (
                  <Tab
                    label={`Biến thể ${index + 1}`}
                    key={index}
                    id={`simple-tab-${index}`}
                    aria-controls={`simple-tabpanel-${index}`}
                  />
                ))}
            </Tabs>
          </Box>
          <Box className="extension-setup">
            <Box className="extension-setup-item">
              {ortherAttributes &&
                ortherAttributes.map((attribute, index) => (
                  <Box key={index} className="extension-setup-item-row">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={attributeNames}
                      fullWidth
                      value={attribute.name}
                      onChange={(_, value: string | null) => {
                        handleChangeName(value);
                        handleSetOtherAttribute(index, 'name', value);
                      }}
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
                    <TextField value={attribute.name} label="Tên thuộc tính" />
                    <TextField value={attribute.value} label="Giá trị thuộc tính" />
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              <Button variant="outlined" onClick={handleAddOtherAttribute}>
                <AddIcon /> Thêm thuộc tính
              </Button>
            </Box>
            <Box className="extension-setup-item">
              <Button variant="outlined">
                <AddIcon /> Thêm thuộc tính
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
};

export default React.memo(ProductCreating);
