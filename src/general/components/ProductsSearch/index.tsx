import { Grid } from '@mui/material';
import { ProductAttributeType, ProductType } from 'src/types/Product';
import { getFlatAttribute } from 'src/utils/getFlatAttribute';
import './ProductsSearch.style.scss';
import { memo } from 'react';
import { replaceImage } from 'src/utils/variable';
interface Props {
  product?: ProductType;
  onClick?: (attribute: ProductAttributeType) => void;
  xs?: number;
}
const ProductsSearch = (props: Props) => {
  const { product, onClick, xs = 12 } = props;
  return (
    <>
      {product?.attributes?.map((attribute) => (
        <Grid
          className="product-item"
          container
          gap={1}
          xs={xs}
          sx={{ padding: '8px' }}
          key={attribute.id}
          flexDirection={'column'}
          onClick={() => onClick && onClick(attribute)}
          alignContent={'center'}
        >
          <div className="attribute-image">
            <img src={attribute?.imageLink ? attribute?.imageLink : replaceImage} alt="attribute" />
          </div>
          <p className="text-center">{getFlatAttribute(attribute)}</p>
          <p className="sell-price text-center">{attribute.sellPrice} đ</p>
        </Grid>
      ))}
    </>
  );
};

export default memo(ProductsSearch);
