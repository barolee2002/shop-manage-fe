import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PATH_PRODUCT, PATH_STOCK_MANAGEMENT } from 'src/general/constants/path';
import { StockProductManagerment } from 'src/types/stokeManagement.type';
const StockManagementNavigate = (props: { item: StockProductManagerment }) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleNavigteDetail = (item: StockProductManagerment) => {
    navigate(PATH_PRODUCT.PRODUCT_DETAIL_PATH.replace(':id', item.productId.toString()), {
      state: {
        pageTitle: 'Quay về trang quản lí kho',
        typeTitle: 'navigate',
        onTitleClick: PATH_STOCK_MANAGEMENT.STOCK_MANAGEMENT,
      },
    });
  };
  const attributes = useMemo(() => {
    return item?.otherAttribute?.reduce((response, attribute) => {
      return (response = response + attribute.value + ' ');
    }, '');
  }, [item]);
  return (
    <React.Fragment>
      <p role="presentation" className="content-wrapper-table-header-title" onClick={() => handleNavigteDetail(item)}>
        {item.productName} {item.productBrand} {attributes}
      </p>
    </React.Fragment>
  );
};

export default memo(StockManagementNavigate);
