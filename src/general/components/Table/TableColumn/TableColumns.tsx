import React from 'react';
import { InventoryCost, ProductAttributeType, ProductType } from 'src/types/Product';
import { replaceImage } from 'src/utils/variable';
import { ReceiptsType } from 'src/types/ReceiptType';
import { getformatDate, getformatDateTime } from 'src/utils/formatDate';
import ProductNameNavigate from '../../NavigateItem/ProductNameNavigate';
import ReceiptNavigate from '../../NavigateItem/ReceiptNavigate';
import SellingNavigate from '../../NavigateItem/Selling';
import StockTakeNavigate from '../../NavigateItem/StockTakeNavigate';
import { initialPayment } from 'src/utils/initialValue';
import { StockTakeType } from 'src/types/stokeTakeTypes';
import { UserType } from 'src/types/user.type';
import { payStatusOptions, staffRoles } from 'src/general/constants/utils.constants';
import { formatPhoneNumber } from 'src/utils/phoneFormat';
import { SellingOrderType } from 'src/types/selling.type';
import { StockProductManagerment } from 'src/types/stokeManagement.type';
import StockManagementNavigate from '../../NavigateItem/StockManagementNavigate';
import { CustomerType } from 'src/types/customer.type';
import CustomerNavigate from '../../NavigateItem/CustomerNavigate';
import SupplierNameNavigate from '../../NavigateItem/SupplierNavigate';
import { SupplierType } from 'src/types/supplier.type';
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
    field: 'quantity',
    headerName: 'Số lượng',
    headerClassName: 'content-wrapper-table-header',
  },
  {
    field: 'costPrice',
    headerName: 'Giá mua',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: ProductAttributeType) => <p className="cost-price">{params.costPrice?.toLocaleString()}</p>,
  },
  {
    field: 'sellPrice',
    headerName: 'Giá bán',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: ProductAttributeType) => <p className="sell-price">{params.sellPrice?.toLocaleString()}</p>,
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
    renderCell: (item: ReceiptsType) => <p className="sell-price">{item.total?.toLocaleString()} đ</p>,
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
    field: 'create',
    headerName: 'Người tạo phiếu',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: StockTakeType) => <p>{item?.create?.name}</p>,
  },
  {
    field: 'confirm',
    headerName: 'Người xác nhận',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: StockTakeType) => <p>{item?.confirm?.name}</p>,
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

export const StaffTableColumn = [
  {
    field: 'code',
    headerName: 'Mã nhân viên',
    headerClassName: 'content-wrapper-table-header',
  },
  {
    field: 'name',
    headerName: 'Tên nhân viên',
    headerClassName: 'content-wrapper-table-header',
  },
  {
    field: 'role',
    headerName: 'Vị trí',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: UserType) => <p>{staffRoles.find((role) => role.value === item.role)?.name}</p>,
  },
  {
    field: 'email',
    headerName: 'email',
    headerClassName: 'content-wrapper-table-header',
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    headerClassName: 'content-wrapper-table-header',
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (item: UserType) => <p>{formatPhoneNumber(item.phone)}</p>,
  },
];

export const HistoryColumn = [
  {
    field: 'createAt',
    headerName: 'Lịch sử hoạt động ( Tối đa 20 hoạt động )',
    renderCell: (item: any) => <p>{getformatDateTime(item?.createAt)}</p>,
  },
  {
    field: 'message',
    headerName: '',
  },
];

export const SellingTicketColumn = [
  {
    field: 'code',
    headerName: 'Mã phiếu',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: SellingOrderType) => <SellingNavigate item={params} />,
  },
  {
    field: 'customer',
    headerName: 'Khách hàng',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: SellingOrderType) => <p>{params?.customer?.id ? params?.customer?.name: 'Khách lẻ'}</p>,
  },
  {
    field: 'staff',
    headerName: 'Nhân viên',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: SellingOrderType) => <p>{params?.staff?.name}</p>,
  },
  {
    field: 'inventory',
    headerName: 'Kho',

    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: SellingOrderType) => <p>{params?.inventory?.name}</p>,
  },
  {
    field: 'discount',
    headerName: 'Giảm giá',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: SellingOrderType) => <p>{params?.discount} %</p>,
  },
  {
    field: 'total',
    headerName: 'Tổng tiền',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: SellingOrderType) => <p>{params.total?.toLocaleString()}</p>,
  },
  {
    field: 'paymentType',
    headerName: 'Hính thức thanh toán',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: SellingOrderType) => (
      <p>{initialPayment.find((pay) => pay.type === params.paymentType)?.field}</p>
    ),
  },
  {
    field: 'createAt',
    headerName: 'Ngày',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: SellingOrderType) => <p>{getformatDate(params.createAt)}</p>,
  },
];
export const StockManagementColumn = [
  {
    field: 'code',
    headerName: 'Mã sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: StockProductManagerment) => <p>{params.code}</p>,
  },
  {
    field: '',
    headerName: 'Sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: StockProductManagerment) => <StockManagementNavigate item={params} />,
  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
  },
  {
    field: 'costPrice',
    headerName: 'Vốn tồn kho (đ)',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: StockProductManagerment) => (
      <p className="cost-price">{(params?.costPrice * params.quantity)?.toLocaleString()}</p>
    ),
  },
  {
    field: 'sellPrice',
    headerName: 'Giá trị tồn (đ)',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: StockProductManagerment) => (
      <p className="sell-price">{(params?.sellPrice * params.quantity)?.toLocaleString()}</p>
    ),
  },
];

export const CustomerColumn = [
  {
    field: 'name',
    headerName: 'Khách hàng',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: CustomerType) => <p>{params?.code}</p>,
  },
  {
    field: 'code',
    headerName: 'Mã khách hàng',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: CustomerType) => <CustomerNavigate item={params} />,
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: CustomerType) => <p>{formatPhoneNumber(params.phone)}</p>,
  },
  {
    field: 'totalOrder',
    headerName: 'Số đơn mua',

    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: CustomerType) => <p className="sell-price">{params?.totalOrder?.toLocaleString()}</p>,
  },
  {
    field: 'totalMoney',
    headerName: 'Số chi tiêu (đ)',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: CustomerType) => <p className="cost-price">{params?.totalMoney?.toLocaleString()}</p>,
  },
];

export const SupplierColumn = [
  {
    field: 'name',
    headerName: 'Tên nhà cung cấp',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: SupplierType) => <SupplierNameNavigate item={params} />,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: SupplierType) => <p>{formatPhoneNumber(params.phone)}</p>,
  },
  {
    field: 'deptMoney',
    headerName: 'Nợ (đ)',

    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: SupplierType) => <p className="sell-price">{params?.deptMoney?.toLocaleString()}</p>,
  },
  {
    field: 'orderQuantity',
    headerName: 'Số đơn đặt hàng',

    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: SupplierType) => <p className="sell-price">{params?.orderQuantity?.toLocaleString()}</p>,
  },
  {
    field: 'totalMoney',
    headerName: 'Tổng chi (đ)',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: SupplierType) => <p className="cost-price">{params?.totalOrderMoney?.toLocaleString()}</p>,
  },
];
