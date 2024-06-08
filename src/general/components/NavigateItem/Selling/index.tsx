import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { PATH_SELLING } from 'src/general/constants/path';
import { SellingOrderType } from 'src/types/selling.type';
const SellingNavigate = (props: { item: SellingOrderType }) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleNavigteDetail = (item: SellingOrderType) => {
    navigate(PATH_SELLING.SELLING_DETAIL.replace(':id', item.id.toString()), {
      state: {
        pageTitle: 'Quay về trang danh sách phiếu mua hàng',
        typeTitle: 'navigate',
        onTitleClick: PATH_SELLING.SELLING_LIST,
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

export default memo(SellingNavigate);
