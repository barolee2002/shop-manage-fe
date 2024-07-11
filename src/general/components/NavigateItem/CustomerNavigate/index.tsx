import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { PATH_CUSTOMER } from 'src/general/constants/path';
import { CustomerType } from 'src/types/customer.type';
const CustomerNavigate = (props: { item: CustomerType }) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleNavigteDetail = (item: CustomerType) => {
    navigate(PATH_CUSTOMER.CUSTOMER_DETAIL.replace(':id', item.id.toString()), {
      state: {
        pageTitle: 'Quay về trang danh sách khách hàng',
        typeTitle: 'navigate',
        onTitleClick: PATH_CUSTOMER.CUSTOMER_LIST_PATH,
      },
    });
  };
  return (
    <React.Fragment>
      <p
        role="presentation"
        className="content-wrapper-table-header-title pointer-text important-text"
        onClick={() => handleNavigteDetail(item)}
      >
        {item.name}
      </p>
    </React.Fragment>
  );
};

export default memo(CustomerNavigate);