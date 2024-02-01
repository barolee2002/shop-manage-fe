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
import { GridColDef } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import './style.scss';
import { useDispatch } from 'react-redux';
import { getformatDate } from 'src/utils/formatDate';
import dayjs, { Dayjs } from 'dayjs';
import { metaData } from 'src/types/MetaData';
import OverviewTable from 'src/general/components/OverViewTable';
import { StyledMenu } from 'src/utils/CustomStyle/StyleMenu';
import { ProductType } from 'src/types/Product';
import { useNavigate } from 'react-router';
import { Topbar } from 'src/general/components/Topbar';
const columns: GridColDef[] = [
  { field: 'key', headerName: 'STT', headerClassName: 'content-wrapper-table-header', width: 90 },
  {
    field: 'code',
    headerName: 'Mã sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Tên sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1.5,

    editable: true,
  },
  {
    field: 'category',
    headerName: 'Loại sản phẩm',
    headerClassName: 'content-wrapper-table-header',
    flex: 1.5,
    editable: true,
  },
  {
    field: 'brand',
    headerName: 'Nhãn hiệu',
    headerClassName: 'content-wrapper-table-header',
    flex: 1.5,
    editable: true,
  },
  {
    field: 'createAt',
    headerName: 'Ngày tạo',
    headerClassName: 'content-wrapper-table-header',
    // width: 150,
    flex: 1,
    editable: true,
    renderCell: (params: any) => <p>{getformatDate(params.value)}</p>,
  },
];
export default function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(producrSelector);
  const [refesh, setRefesh] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [categories, setCategries] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState('');
  const [metadata, setMetadata] = React.useState<metaData>({} as metaData);
  const [searchString, setSearchString] = React.useState('');
  const [openSearchBox, setOpenSearchBox] = React.useState(true);
  const [fromTime, setFromTime] = React.useState<Dayjs | null>(null);
  const [toTime, setToTime] = React.useState<Dayjs | null>(null);
  const [page, setPage] = React.useState(1);
  const [searchResult, setSearchResult] = React.useState<ProductType[]>([]);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  React.useEffect(() => {
    const fromDate =
      fromTime !== null
        ? `${fromTime.toDate().getFullYear()}-${fromTime.toDate().getMonth() + 1}-${fromTime.toDate().getDate()}`
        : null;
    const toDate =
      toTime !== null
        ? `${toTime.toDate().getFullYear()}-${toTime.toDate().getMonth() + 1}-${toTime.toDate().getDate()}`
        : null;
    console.log(fromDate, toDate);

    const fetchData = async () => {
      try {
        // const fromDate =
        const response = await axiosClient.get(`product/all`, {
          params: {
            userId: 1,
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

        dispatch(updateProduct(response.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [refesh]);
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleFilter = () => {
    setRefesh(refesh + 1);
  };
  const handleChangPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setRefesh(refesh + 1);
  };
  const handleSearchProduct = async (input: string) => {
    const response = await axiosClient.get(`product/all`, {
      params: {
        userId: 1,
        name: input,
        code: input,
      },
    });
    console.log(response);

    setSearchResult(response.data.data);
  };
  const handleRowClick = (item: ProductType) => {
    navigate(`${item.id}`);
  };
  return (
    <div className="product-list">
      <BaseLayout>
        <Box className="content">
          <div className="headding">
            <p className="back-page-btn">Danh sách sản phẩm</p>
          </div>
          <Box className="action">
            <Button variant="contained" className="add-btn action-add-btn">
              Thêm sản phẩm
            </Button>
          </Box>
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
                    handleSearchProduct(e.target.value);
                  }}
                  onFocus={(e) => {
                    if (searchResult.length === 0) {
                      handleSearchProduct(e.target.value);
                    }
                  }}
                  // onBlur={() => {
                  //   // setSearchResult([]);
                  //   setOpenSearchBox(false);
                  // }}
                />
                {searchResult.length !== 0 ? (
                  <ul className={`search-result-wrapper ${openSearchBox}`}>
                    {searchResult?.map((result, index) => (
                      <li
                        role="presentation"
                        key={index}
                        className="search-result-wrapper-row"
                        onClick={() => {
                          console.log('nhay day');

                          handleRowClick(result);
                        }}
                      >
                        <p>
                          {result.code} {result.name} {result.category} {result.brand}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </div>
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
            <OverviewTable
              columns={columns}
              rows={products}
              metadata={metadata}
              onChangePage={handleChangPage}
              onRowClick={(item) => handleRowClick(item)}
            />
          </Box>
        </Box>
      </BaseLayout>
    </div>
  );
}
