import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { PATH_RECEIPT_PRODUCT } from 'src/general/constants/path';
import { ReceiptsType } from 'src/types/ReceiptType';
const ReceiptNavigate = (props: { item: ReceiptsType }) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleNavigteDetail = (item: ReceiptsType) => {
    navigate(PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_DETAIL_PATH.replace(':id', item.id.toString()), {
      state: {
        pageTitle: 'Quay về trang danh sách đơn hàng',
        typeTitle: 'navigate',
        onTitleClick: PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_LIST_PATH,
      },
    });
  };
  return (
    <React.Fragment>
      <p
        role="presentation"
        className="content-wrapper-table-header-title important-text"
        onClick={() => handleNavigteDetail(item)}
      >
        {item.code}
      </p>
    </React.Fragment>
  );
};

export default memo(ReceiptNavigate);
