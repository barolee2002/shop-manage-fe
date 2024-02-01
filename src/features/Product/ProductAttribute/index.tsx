import React from 'react';
import { BaseLayout } from '../../../general/components/BaseLayout';
import axiosClient from 'src/api/axiosClient';
import { useParams } from 'react-router';
import './style.scss';
import { Box, TextField } from '@mui/material';
import { ProductAttributeType } from 'src/types/Product';
export default function ProductAttribute() {
  const { attributeId, id } = useParams();
  const [attribute, setAttribute] = React.useState<ProductAttributeType>({} as ProductAttributeType);
  const handleChangeAttribute = (title: string, value: any) => {};
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get(`product-attributes/detail/${attributeId}`);
      console.log(response);
      setAttribute(response.data);
    };
    fetchData();
  },[]);
  const a = 9 + '9';
  console.log(a);
  return (
    <div className="product-attribute">
      <BaseLayout>
        <div className="content ">
          <Box className="content-attribute">
            <div className="product-attribute-overview w-70">
              <div className="product-attribute-heading">
                <h4 className="title">Chỉnh sửa Thông tin</h4>
              </div>
              <Box className="detail">
                <Box className="detail-attribute">
                  <Box className="attribute-row">
                    <p>Chất liệu</p>
                    <TextField
                      size="small"
                      fullWidth
                      value={attribute.material}
                      onChange={(e) => handleChangeAttribute('material', e.target.value)}
                    ></TextField>
                  </Box>
                  <Box className="attribute-row">
                    <p>Xuất xứ</p>
                    <TextField
                      size="small"
                      fullWidth
                      value={attribute.origin}
                      onChange={(e) => handleChangeAttribute('origin', e.target.value)}
                    ></TextField>
                  </Box>
                  <Box className="attribute-row">
                    <p>Kích cỡ</p>
                    <TextField
                      size="small"
                      fullWidth
                      value={attribute.size}
                      onChange={(e) => handleChangeAttribute('size', e.target.value)}
                    ></TextField>
                  </Box>
                  <Box className="attribute-row">
                    <p>Màu sắc</p>
                    <TextField
                      size="small"
                      fullWidth
                      value={attribute.variation}
                      onChange={(e) => handleChangeAttribute('variation', e.target.value)}
                    ></TextField>
                  </Box>
                </Box>
              </Box>
            </div>
            <div className="product-attribute-image">
              <div className="product-image">hgjghj</div>
            </div>
          </Box>
        </div>
      </BaseLayout>
    </div>
  );
}
