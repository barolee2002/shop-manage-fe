import { ProductAttributeType, ProductType } from 'src/types/Product';

export const getFlatProduct = (data: ProductType[]) => {
  return data?.map((product) => {
    const flatAttribute = product?.attributes?.map((attribute) => {
      const otherAttributeFlat = attribute?.otherAttribute.reduce((result, otherAttribute) => {
        return result + otherAttribute.value;
      }, '');
      return {
        product: { ...attribute, productName: product.name } as ProductAttributeType,
        message: `${product.name} ${product.brand} ${otherAttributeFlat}`,
      };
    });
    return flatAttribute;
  });
};
