import React from 'react';
import { InventoryCost, ProductAttributeType, ProductType } from 'src/types/Product';
import { replaceImage } from 'src/utils/variable';
import { ReceiptsType } from 'src/types/ReceiptType';
import { getformatDate } from 'src/utils/formatDate';
import ProductNameNavigate from '../../NavigateItem/ProductNameNavigate';
import ReceiptNavigate from '../../NavigateItem/ReceiptNavigate';
import StockTakeNavigate from '../../NavigateItem/StockTakeNavigate';
import { initialPayment } from 'src/utils/initialValue';
import { StockTakeType } from 'src/types/stokeTakeTypes';
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
    field: 'inventory',
    headerName: 'Kho',
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

export const ReceiptListColumn = [
  {
    field: 'code',
    headerName: 'Mã phiếu',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => <ReceiptNavigate item={item} />,
  },
  {
    field: 'total',
    headerName: 'Giá trị đơn',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => <p>{item.total?.toLocaleString()} đ</p>,
  },
  {
    field: 'payStatus',
    headerName: 'Thanh toán',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => (
      <>
        {item.payStatus ? (
          <p className="susscess-status">Đã thanh toán</p>
        ) : (
          <p className="error-color">Đang giao dịch</p>
        )}
      </>
    ),
  },
  {
    field: 'paymentType',
    headerName: 'HÌnh thức thanh toán',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => (
      <>
        {item.payStatus ? <p>{initialPayment.find((payment) => payment.type === item.paymentType)?.field}</p> : <></>}
      </>
    ),
  },
  {
    field: 'bookingUser',
    headerName: 'Người tạo đơn',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => <p>{item?.bookingUser?.name}</p>,
  },
  {
    field: 'supplier',
    headerName: 'Nhà cùng cấp',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => <p>{item?.supplier?.name}</p>,
  },
  {
    field: 'bookingDate',
    headerName: 'Ngày tạo đơn',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => <p>{getformatDate(item.bookingDate)}</p>,
  },
];

export const InventoryInColumn = [
  {
    field: 'code',
    headerName: 'Mã phiếu',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => <ReceiptNavigate item={item} />,
  },
  {
    field: 'total',
    headerName: 'Giá trị đơn',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => <p>{item.total?.toLocaleString()}</p>,
  },
  {
    field: 'payStatus',
    headerName: 'Thanh toán',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => (
      <>
        {item.payStatus ? (
          <p className="susscess-status">Đã thanh toán</p>
        ) : (
          <p className="error-color">Đang giao dịch</p>
        )}
      </>
    ),
  },
  {
    field: 'receiptStatus',
    headerName: 'Nhập kho',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => (
      <>
        {item.receiptStatus ? (
          <p className="susscess-status">Đã nhập kho</p>
        ) : (
          <p className="error-color">Chưa nhập kho</p>
        )}
      </>
    ),
  },
  {
    field: 'confirmUser',
    headerName: 'Nguời nhập kho',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => <p>{item?.confirmUser?.name}</p>,
  },
  {
    field: 'receiptDate',
    headerName: 'Ngày nhập kho',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: ReceiptsType) => <p>{getformatDate(item.bookingDate)}</p>,
  },
];

export const StockTakeColumn = [
  {
    field: 'code',
    headerName: 'Mã phiếu',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: StockTakeType) => <StockTakeNavigate item={item} />,
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: StockTakeType) => (
      <>
        {item.status ? (
          <p className="susscess-status">Đã cập nhập kho</p>
        ) : (
          <p className="error-color">Chưa xác nhận</p>
        )}
      </>
    ),
  },
  {
    field: 'createUser',
    headerName: 'Người tạo phiếu',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: StockTakeType) => <p>{item?.createUser?.name}</p>,
  },
  {
    field: 'confirmUser',
    headerName: 'Người xác nhận',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: StockTakeType) => <p>{item?.confirmUser?.name}</p>,
  },
  {
    field: 'createAt',
    headerName: 'Ngày tạo phiếu',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: StockTakeType) => <p>{getformatDate(item.createAt)}</p>,
  },
  {
    field: 'updateAt',
    headerName: 'Ngày xác nhận',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: StockTakeType) => <p>{getformatDate(item.updateAt)}</p>,
  },
];