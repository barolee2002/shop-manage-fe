import { ProductAttributeType } from 'src/types/Product';

export const getFlatAttribute = (productAttribute: ProductAttributeType) => {
  const flatOtherAttribute = productAttribute?.otherAttribute?.reduce((result, attribute) => {
    result = result + ` ${attribute?.value}`;
    return result;
  }, '');
  return `${productAttribute?.productName} ${flatOtherAttribute}`;
};
