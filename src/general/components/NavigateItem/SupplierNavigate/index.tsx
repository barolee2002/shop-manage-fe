import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { PATH_SUPPLIER } from 'src/general/constants/path';
import { SupplierType } from 'src/types/supplier.type';
const SupplierNameNavigate = (props: { item: SupplierType }) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleNavigteDetail = (item: SupplierType) => {
    navigate(PATH_SUPPLIER.SUPPLIER_DETAIL.replace(':id', item.id.toString()), {
      state: {
        pageTitle: 'Quay về trang danh sách nhà cung cấp',
        typeTitle: 'navigate',
        onTitleClick: PATH_SUPPLIER.SUPPLIER_LIST_PATH,
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
        {item.name}
      </p>
    </React.Fragment>
  );
};

export default memo(SupplierNameNavigate)