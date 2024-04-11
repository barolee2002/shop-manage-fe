/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/named */

import React from 'react';
import { useSelector } from 'react-redux';
import axiosClient from 'src/api/axiosClient';
import { BaseLayout } from 'src/general/components/BaseLayout';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, TextField, Menu, Pagination, PaginationItem } from '@mui/material';
import { MenuProps } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { producrSelector } from 'src/redux/selector';
import InputAdornment from '@mui/material/InputAdornment';
import { Search as SearchIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { updateProduct } from './ProductSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import './style.scss';
import { useDispatch } from 'react-redux';
import { getformatDate } from 'src/utils/formatDate';
import { Dayjs } from 'dayjs';
import { metaData } from 'src/types/MetaData';
import { StyledMenu } from 'src/utils/CustomStyle/StyleMenu';
import { ProductAttributeType, ProductType } from 'src/types/Product';
import { useNavigate } from 'react-router';
import { useDebounce } from 'src/hook';
import ProductListTopbar from 'src/general/components/Topbar/ProductListTopbar';
import ColabTable from 'src/general/components/Table/ColabTable';
import SubTable from 'src/general/components/Table/ColabTable/SubTable';
import OnceRow from 'src/general/components/Table/Product/OnceRow';
import ColabRow from 'src/general/components/Table/Product/ColabRow';

const columns = [
  { field: 'key', headerName: 'STT', headerClassName: 'content-wrapper-table-header', width: 90 },
  {
    field: 'name',
    headerName: 'Tên sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: ProductType) => <p className="content-wrapper-table-header-title">{params.name}</p>,
  },
  {
    field: 'code',
    headerName: 'Mã sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
  },
  {
    field: 'totalQuantity',
    headerName: 'Số lượng',
    headerClassName: 'content-wrapper-table-header',
    renderCell: (params: ProductType) => (
      <p className={params.totalQuantity > 10 ? '' : 'quantity-danger'}>{ params.totalQuantity?.toLocaleString()}</p>
    ),
  },
  {
    field: 'price',
    headerName: 'Giá bán',

    headerClassName: 'content-wrapper-table-header',
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
  {
    field: 'createAt',
    headerName: 'Ngày tạo',
    headerClassName: 'content-wrapper-table-header',
    // width: 150,
    flex: 1,

    renderCell: (params: ProductType) => <p>{getformatDate(params.createAt)}</p>,
  },
];
const subColumns = [
  {
    field: 'imageLink',
    headerName: 'Ảnh',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    renderCell: (params: ProductAttributeType) => <img src={params.imageLink} alt="product" />,
  },
  {
    field: 'name',
    headerName: 'Sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
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
export default function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(producrSelector);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [categories, setCategries] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState('');
  const [metadata, setMetadata] = React.useState<metaData>({} as metaData);
  const [searchString, setSearchString] = React.useState('');
  const debounceString = useDebounce(searchString, 500);
  const [fromTime, setFromTime] = React.useState<Dayjs | null>(null);
  const [toTime, setToTime] = React.useState<Dayjs | null>(null);
  const [page, setPage] = React.useState(1);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const fetchData = async () => {
    const fromDate =
      fromTime !== null
        ? `${fromTime.toDate().getFullYear()}-${fromTime.toDate().getMonth() + 1}-${fromTime.toDate().getDate()}`
        : null;
    const toDate =
      toTime !== null
        ? `${toTime.toDate().getFullYear()}-${toTime.toDate().getMonth() + 1}-${toTime.toDate().getDate()}`
        : null;
    console.log(fromDate, toDate);
    try {
      // const fromDate =
      const response = await axiosClient.get(`product/all`, {
        params: {
          userId: 1,
          searchString: searchString,
          category: category,
          page: page,
          fromTime: fromDate,
          toTime: toDate,
        },
      });
      const categoriesResponse = await axiosClient.get(`product/categories/${1}`);
      setCategries(categoriesResponse.data);
      setMetadata({
        elements: response.data.elements,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
      });
      // setPage(1);
      page > response.data.totalPages && setPage(1);

      dispatch(updateProduct(response.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [page, debounceString]);
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleFilter = () => {
    fetchData();
  };
  const handleChangPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowClick = (item: ProductType) => {
    navigate(`${item.id}`);
  };
  const handleAddProduct = () => {};
  return (
    <div className="product-list">
      <BaseLayout
        topbarChildren={
          <ProductListTopbar pageTitle="Danh sách sản phẩm" buttonTitle="Thêm sản phẩm" onAdd={handleAddProduct} />
        }
      >
        <Box className="content">
          <Box className="content-wrapper">
            <Box className="content-wrapper-search">
              <div className="search-result">
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setSearchString(e.target.value);
                  }}
                />
              </div>
              <Button></Button>
              <Box className="fillter-box">
                <Button
                  fullWidth
                  aria-describedby={id}
                  variant="contained"
                  className="content-wrapper-search-btn"
                  onClick={handlePopoverOpen}
                >
                  Bộ lọc
                </Button>
                <StyledMenu
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handlePopoverClose}
                >
                  <Box className="fillter-box-wrapper">
                    <Box className="fillter-box-wrapper-item">
                      <TextField className="filter-title" disabled value={'Ngày tạo'} />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={fromTime}
                          onChange={(value) => {
                            setFromTime(value);
                          }}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={toTime}
                          onChange={(value) => {
                            setToTime(value);
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                    <Box className="fillter-box-wrapper-item">
                      <TextField className="filter-title" disabled value={'Loại trang phục'} />
                      <Select value={category} onChange={handleChangeCategory}>
                        <MenuItem value="">Chọn loại trang phục</MenuItem>
                        {categories?.map((categoryItem, index) => (
                          <MenuItem key={index} value={categoryItem}>
                            {categoryItem}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Button variant="contained" className="filter-btn" onClick={handleFilter}>
                      Lọc
                    </Button>
                  </Box>
                </StyledMenu>
              </Box>
            </Box>
            <ColabTable
              columns={columns}
              rows={products.map((product, index) => {
                return {
                  ...product,
                  subTableRow: product.attributes,
                  key: (page - 1) * 10 + index + 1,
                };
              })}
              metadata={metadata}
              onceRow={(...rest : any) => <OnceRow {...rest} />}
              colabRow={(...rest : any) => <ColabRow {...rest} />}
              onChangePage={handleChangPage}
              className="content-wrapper-table"
              subTable={(item: ProductType) => (
                <SubTable
                  pagination={false}
                  pageTitle="Hàng hóa tương tự"
                  columns={subColumns}
                  rows={item.attributes?.map((attribute) => {
                    return { ...attribute, key: attribute.id };
                  })}
                />
              )}
              // onRowClick={handleRowClick}
            />
          </Box>
        </Box>
      </BaseLayout>
    </div>
  );
}
