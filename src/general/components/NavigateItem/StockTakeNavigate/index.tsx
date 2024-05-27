import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { PATH_INVENTORY_TAKE_CARE } from 'src/general/constants/path';
import { StockTakeType } from 'src/types/stokeTakeTypes';
const StockTakeNavigate = (props: { item: StockTakeType }) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleNavigteDetail = (item: StockTakeType) => {
    navigate(PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_DETAIL_PATH.replace(':id', item.id.toString()), {
      state: {
        pageTitle: 'Quay về trang danh sách đơn hàng',
        typeTitle: 'navigate',
        onTitleClick: PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_LIST_PATH,
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

export default memo(StockTakeNavigate);
