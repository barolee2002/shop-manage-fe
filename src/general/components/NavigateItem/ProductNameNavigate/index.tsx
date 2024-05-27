import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { ProductType } from 'src/types/Product';
import { PATH_PRODUCT } from 'src/general/constants/path';
const ProductNameNavigate = (props: { item: ProductType }) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleNavigteDetail = (item: ProductType) => {
    navigate(PATH_PRODUCT.PRODUCT_DETAIL_PATH.replace(':id', item.id.toString()), {
      state: {
        pageTitle: 'Quay về trang danh sách sản phẩm',
        typeTitle: 'navigate',
        onTitleClick: PATH_PRODUCT.PRODUCT_LIST_PATH,
      },
    });
  };
  return (
    <React.Fragment>
      {item.attributes.length <= 1 ? (
        <p
          role="presentation"
          className="content-wrapper-table-header-title"
          onClick={() => handleNavigteDetail(item)}
        >{`${item.name} ${item.attributes[0].otherAttribute?.map((attribute) => attribute.value).toString()}`}</p>
      ) : (
        <p role="presentation" className="content-wrapper-table-header-title" onClick={() => handleNavigteDetail(item)}>
          {item.name}
        </p>
      )}
    </React.Fragment>
  );
};

export default memo(ProductNameNavigate)