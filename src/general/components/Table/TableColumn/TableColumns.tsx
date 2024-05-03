import React from 'react';
import { useNavigate } from 'react-router';
import { InventoryCost, ProductAttributeType, ProductType } from 'src/types/Product';
import { replaceImage } from 'src/utils/variable';
const ProductNameNavigate = (props: { item: ProductType }) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleNavigteDetail = (item: ProductType) => {
    navigate(`${item.id}`, {
      state: {
        pageTitle: 'Quay về trang danh sách sản phẩm',
        typeTitle: 'navigate',
        onTitleClick: '/admin/products',
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

export const productColumns = [
  { field: 'key', headerName: 'STT', headerClassName: 'content-wrapper-table-header', width: 90 },
  {
    field: 'imageLink',
    headerName: 'Ảnh',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: ProductType) => {
      return params.imageLink ? (
        <img
          src={params.imageLink}
          alt="product"
          className="image-product"
          loading="lazy"
          onError={({ currentTarget }) => {
            currentTarget.src = replaceImage;
          }}
        />
      ) : (
        <img src={replaceImage} className="image-product" loading="lazy" alt="replace" />
      );
    },
  },
  {
    field: 'name',
    headerName: 'Tên sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: ProductType) => <ProductNameNavigate item={params} />,
  },
  {
    field: 'code',
    headerName: 'Mã sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: ProductType) => {
      return params.attributes.length > 1 ? <p>Hàng nhiều loại</p> : <p>{params.attributes[0].code}</p>;
    },
  },
  {
    field: 'totalQuantity',
    headerName: 'Số lượng',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: ProductType) => (
      <p className={params.totalQuantity > 10 ? '' : 'quantity-danger'}>{params.totalQuantity?.toLocaleString()}</p>
    ),
  },
  {
    field: 'price',
    headerName: 'Giá bán',

    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: ProductType) => {
      return params.attributes.length > 1 ? (
        <p className="sell-price">
          {params.minPrice?.toLocaleString()} - {params.maxPrice?.toLocaleString()}
        </p>
      ) : (
        <p className="sell-price">{params.maxPrice?.toLocaleString()}</p>
      );
    },
  },
  {
    field: 'category',
    headerName: 'Loại sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
  },
  {
    field: 'brand',
    headerName: 'Nhãn hiệu',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
  },
];
export const productSubColumns = [
  {
    field: 'imageLink',
    headerName: 'Ảnh',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: ProductAttributeType) => {
      return params.imageLink ? (
        <img
          src={params.imageLink}
          alt="product"
          className="image-product"
          loading="lazy"
          onError={({ currentTarget }) => {
            currentTarget.src = replaceImage;
          }}
        />
      ) : (
        <img loading="lazy" src={replaceImage} className="image-product" alt="replace" />
      );
    },
  },
  {
    field: 'name',
    headerName: 'Sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (item: ProductAttributeType) => (
      <p>{`${item.productName} ${item.otherAttribute?.map((attribute) => attribute.value).toString()}`}</p>
    ),
  },
  {
    field: 'code',
    headerName: 'Mã sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
  },
  {
    field: 'costPrice',
    headerName: 'Giá nhập',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: ProductAttributeType) => <p className="cost-price">{params.costPrice?.toLocaleString()}</p>,
  },
  {
    field: 'sellPrice',
    headerName: 'Giá bán',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: ProductAttributeType) => <p className="sell-price">{params.sellPrice?.toLocaleString()}</p>,
  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
  },
];

export const ProductDetailColumn = [
  {
    field: 'imageLink',
    headerName: 'Ảnh',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: ProductAttributeType) => {
      return params.imageLink ? (
        <img
          src={params.imageLink}
          alt="product"
          className="image-product"
          loading="lazy"
          onError={({ currentTarget }) => {
            currentTarget.src = replaceImage;
          }}
        />
      ) : (
        <img loading="lazy" src={replaceImage} className="image-product" alt="replace" />
      );
    },
  },
  {
    field: 'code',
    headerName: 'Mã sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
  },
  {
    field: '',
    headerName: 'Thuộc tính',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: ProductAttributeType) => (
      <React.Fragment>
        {params.otherAttribute?.map((attribute, index) => (
          <React.Fragment key={index}>
            <p>
              {attribute.name} : {attribute.value}
            </p>
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
  },
  {
    field : 'inventory',
    headerName : 'Kho',
    headerClassName: 'content-wrapper-table-header',

  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    headerClassName: 'content-wrapper-table-header',
  },
  {
    field: 'costPrice',
    headerName: 'Giá mua',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: ProductAttributeType) => <p className="cost-price">{params.costPrice}</p>,
  },
  {
    field: 'sellPrice',
    headerName: 'Giá bán',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: ProductAttributeType) => <p className="sell-price">{params.sellPrice}</p>,

  },
];

export const ProductDetailSubColumn = [
  {
    field: '',
    headerName: 'Kho',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: InventoryCost) => <p>{item.inventory.name}</p>,
  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    headerClassName: 'content-wrapper-table-header',
  },
  {
    field: 'costPrice',
    headerName: 'Giá mua',
    headerClassName: 'content-wrapper-table-header',
  },
  {
    field: 'sellPrice',
    headerName: 'Giá bán',
    headerClassName: 'content-wrapper-table-header',
  },
];
