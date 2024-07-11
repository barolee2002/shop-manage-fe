import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Snackbar,
  Tab,
  TablePagination,
  Tabs,
  TextField,
} from '@mui/material';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';
import { useDebounce } from 'src/hook/useDebounce';
import './SellingCreating.styles.scss';
import useGetProductList from 'src/hook/product/useGetProductsList';
import { useSelector, useDispatch } from 'react-redux';
import { alertSelector, inventorySelector, productSelector, userModelSelector } from 'src/redux/selector';
import { FilterProductType, ProductAttributeType, ProductType } from 'src/types/Product';
import { useNavigate } from 'react-router';
import useAuth from 'src/hook/auth/useAuth';
import { PATH_PRODUCT, PATH_STAFF } from 'src/general/constants/path';
import { updateProduct } from 'src/features/Product/ProductsList/ProductSlice';
import ProductsSearch from 'src/general/components/ProductsSearch';
import { metaData } from 'src/types/MetaData';
import { closeAlert, openAlert } from 'src/general/components/BaseLayout/alertSlice';
import { SellingOrderType } from 'src/types/selling.type';
import { initialOrder, initialOrderDetail } from 'src/utils/initialValue';
import { getFlatAttribute } from 'src/utils/getFlatAttribute';
import { useReactToPrint } from 'react-to-print';
import Bill from 'src/general/components/Bill';
import useGetCustomers from 'src/hook/customer/useGetCustomers';
import { CustomerType } from 'src/types/customer.type';
import useCreateSelling from 'src/hook/selling/useCreateSelling';
import { UserType } from 'src/types/user.type';
import { getTotalPriceSelling } from 'src/utils/getTotalPriceSelling';
import { Link } from 'react-router-dom';

const SellingCreating = () => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState<string>('');
  const navigate = useNavigate();
  const inventories = useSelector(inventorySelector);

  const alert = useSelector(alertSelector);
  const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeAlert());
  };
  const products = useSelector(productSelector);
  const [tabValue, setTabValue] = React.useState(0);
  const userModel = useSelector(userModelSelector);
  const [getProducts] = useGetProductList();
  const { logout } = useAuth();
  const [showDiscount, setShowDiscount] = useState<number>(0);
  const [metadata, setMetadata] = useState<metaData>({} as metaData);
  const searchValue = useDebounce(searchString);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sellings, setSellings] = useState<SellingOrderType[]>([initialOrder]);
  const open = Boolean(anchorEl);
  const { reFetchGetCustomers } = useGetCustomers(userModel.storeId);
  const { createSelling } = useCreateSelling();
  const [customerSearch, setCustomerSearch] = useState<string>('');
  const customerSearchValue = useDebounce(customerSearch);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [page, setPage] = React.useState(0);
  const [customerOptions, setCustomerOptions] = useState<CustomerType[]>([]);
  const billref = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<FilterProductType>({
    storeId: userModel.storeId,
    pageSize: rowsPerPage,
    page: page + 1,
  } as FilterProductType);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handlePrint = useReactToPrint({
    content: () => billref.current,
    documentTitle: 'Hóa đon thanh toán',
    onBeforePrint: () => {
      const dataPost: SellingOrderType = {
        ...sellings[tabValue],
        staff: userModel as unknown as UserType,
        storeId: userModel.storeId,
        details: sellings[tabValue]?.details?.filter((detail) => detail?.product?.id !== 0),
        total: getTotalPriceSelling(sellings[tabValue]),
      };
      return createSelling(dataPost).then(() => {
        setFilter(() => ({ ...filter, inventoryId: 0 }));
        dispatch(openAlert({ message: 'Thanh toán thành công', type: 'success' }));
      });
    },
    onBeforeGetContent: () => {
      // Optional: logic before getting the content
      return new Promise<void>((resolve) => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
          @page {
            size: auto;
            margin: 10mm;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
            }
            .no-print {
              display: none;
            }
            .print-container {
              box-sizing: border-box;
              width: 100%;
              margin: 20px;
              padding: 20px;
              object-fit: cover
            }
            .customer {
              text-align: center;
            }
            .customer-name {
              font-weight: 500;
            }
            .bill-title{
              width: 100%;
              text-align: center;
              font-size: 18px;
              font-weight: 700;
            }
            .Input-notchedOutline{
              border: none
            }
          }
        `;
        document.head.appendChild(styleElement);
        resolve();
      });
    },
    onAfterPrint: () => {
      handleDeleteOrder(tabValue);
      fetchProduct();
    },
  });
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenDetailUser = () => {
    navigate(PATH_STAFF.STAFF_DETAIL_PATH.replace(':id', String(userModel.id)));
  };
  const handleSetFilter = (title: string, value: any) => {
    setFilter((prev) => ({ ...prev, [title]: value }));
  };
  const handleChangeSearchString = (value: string) => {
    if (!filter.inventoryId && value !== '') {
      dispatch(openAlert({ message: 'Vui lòng chọn kho trước', type: 'error' }));
      setSearchString('');
      return;
    }
    setSearchString(value);
    setPage(0);
    setRowsPerPage(20);
  };
  const handleChangeTab = (value: number) => {
    setTabValue(value);
    handleSetFilter('inventoryId', sellings[value]?.inventory?.id);
  };
  const handleChangeSelling = (title: string, value: any) => {
    setSellings(
      (prev) =>
        prev?.map((selling, index) => {
          return index === tabValue ? { ...selling, [title]: value } : selling;
        })
    );
  };
  const handleLogout = () => {
    logout().then(() => {
      navigate('/login');
    });
  };
  const handleAddOrder = () => {
    setSellings((prev) => [...prev, initialOrder]);
  };
  const handleDeleteOrder = (value: number) => {
    if (sellings?.length === 1) {
      setSellings([initialOrder]);
      setFilter({
        storeId: userModel.storeId,
        pageSize: rowsPerPage,
        page: page + 1,
      } as FilterProductType);
      setTabValue(0);
      return;
    }
    setSellings((prev) => prev.filter((_, index) => index !== value));
    setTabValue(tabValue === value ? tabValue - 1 : tabValue);
  };
  const activePayButton = useMemo(() => {
    const productCheck = sellings[tabValue]?.details?.filter((detail) => detail?.product?.id !== 0);
    return sellings[tabValue]?.inventory && productCheck.length;
  }, [sellings[tabValue]]);
  const handleChooseProduct = (chooseProduct: ProductAttributeType) => {
    const lenght = sellings[tabValue]?.details?.filter((detail) => detail?.product?.id === chooseProduct?.id);
    if (lenght.length) {
      dispatch(openAlert({ message: 'Sản phẩm đã sẵn sàng trong đơn hàng', type: 'error' }));
      return;
    }
    setSellings((prev) => [
      ...prev.map((item, index) => {
        if (index === tabValue) {
          return {
            ...item,
            details: [
              ...item.details,
              { ...initialOrderDetail, product: chooseProduct, price: chooseProduct.sellPrice },
            ],
          };
        }
        return item;
      }),
    ]);
  };
  const handleDeleteProduct = (productId: number) => {
    setSellings((prev) => [
      ...prev.map((item, index) => {
        if (index === tabValue) {
          return {
            ...item,
            details: item.details?.filter((detail) => detail?.product?.id !== productId),
          };
        }
        return item;
      }),
    ]);
  };
  const handleAddProduct = (productId: number) => {
    setSellings((prev) => [
      ...prev.map((item, index) => {
        if (index === tabValue) {
          return {
            ...item,
            details: item.details?.map((product) => {
              return product.product?.id === productId ? { ...product, quantity: product.quantity + 1 } : product;
            }),
          };
        }
        return item;
      }),
    ]);
  };
  const handleMinusProduct = (productId: number) => {
    setSellings((prev) => [
      ...prev.map((item, index) => {
        if (index === tabValue) {
          return {
            ...item,
            details: item.details?.map((product) => {
              return product.product?.id === productId ? { ...product, quantity: product.quantity - 1 } : product;
            }),
          };
        }
        return item;
      }),
    ]);
  };
  const handleChangeDetail = (productId: number, title: string, value: any) => {
    setSellings((prev) => [
      ...prev.map((item, index) => {
        if (index === tabValue) {
          return {
            ...item,
            details: item.details?.map((product) => {
              return product.product?.id === productId ? { ...product, [title]: value } : product;
            }),
          };
        }
        return item;
      }),
    ]);
  };
  const handleOpenDiscount = (productId: number) => {
    if (showDiscount === productId) {
      setShowDiscount(0);
      return;
    }
    setShowDiscount(productId);
  };
  useEffect(() => {
    handleSetFilter('searchString', searchValue);
    handleSetFilter('page', page + 1);
    handleSetFilter('pageSize', rowsPerPage);
  }, [searchValue, page, rowsPerPage]);
  useEffect(() => {
    reFetchGetCustomers({ searchString: customerSearchValue }).then((res) => setCustomerOptions(res.data));
  }, [customerSearchValue]);
  console.log(sellings);

  const fetchProduct = () => {
    getProducts(filter)
      .then((res) => {
        dispatch(updateProduct(res.data));
        setMetadata(res.metaData);
      })
      .catch((err) => {
        if (err.status === 400) {
          dispatch(openAlert({ message: 'Vui lòng chọn kho trước', type: 'error' }));
        }
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [filter]);

  return (
    <div className="selling-wrapper">
      <Box sx={{ height: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={alert.open}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity={alert.type} variant="filled" sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Grid container className="selling-wrapper-header">
          <Grid item xs={1} lg={4}>
            <Box sx={{ fontWeight: '900', fontSize: '1.8rem', color: '#fff' }}>
              <Link to={PATH_PRODUCT.PRODUCT_LIST_PATH}>BARO</Link>
            </Box>
          </Grid>
          <Grid item xs={11} lg={4} className="selling-wrapper-header-item">
            <TextField
              size="small"
              fullWidth
              placeholder="Tìm kiếm theo mã đơn hàng"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                handleChangeSearchString(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={1} lg={4} container justifyContent={'flex-end'}>
            <Grid item xs={4} className="selling-wrapper-header-item">
              <Button fullWidth onClick={handleClick}>
                <PersonIcon /> {userModel.name}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                sx={{ marginTop: '8px' }}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleOpenDetailUser}>Thông tin tài khoản</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="selling-wrapper-content">
          <Grid xs={1} lg={4} sx={{ position: 'relative', height: '100%' }}>
            <Grid container item gap={2} justifyContent={'space-between'} className="selling-wrapper-content-item">
              {products?.length ? (
                products?.map((product: ProductType) => (
                  <React.Fragment key={product.id}>
                    <ProductsSearch
                      xs={3.5}
                      onClick={handleChooseProduct}
                      product={{
                        ...product,
                        attributes: product?.attributes?.map((attribute) => ({
                          ...attribute,
                          productName: product.name,
                        })),
                      }}
                    />
                  </React.Fragment>
                ))
              ) : (
                <InventoryIcon className="blur-box" fontSize="large" sx={{ fontSize: '150px' }} />
              )}
              <Grid item xs={12} className="selling-wrapper-content-item-pagination">
                <TablePagination
                  component="div"
                  count={metadata?.totalElements ?? 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[20, 30, 40, 50]}
                  labelRowsPerPage="Hiển thị"
                  labelDisplayedRows={({ from, to, count }) => {
                    return `${from}-${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`;
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11} lg={6} className="selling-wrapper-content-item">
            <Grid container gap={1} wrap="wrap">
              <Grid item lg={10}>
                <Tabs
                  value={tabValue}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="basic tabs example"
                  onChange={(_, value) => handleChangeTab(value)}
                >
                  {sellings &&
                    sellings.map((_, index) => (
                      <Tab
                        label={
                          <span>
                            Đơn hàng {index + 1}
                            <IconButton
                              component="span"
                              onClick={(e) => {
                                e.preventDefault;
                                handleDeleteOrder(index);
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </span>
                        }
                        key={index}
                        id={`simple-tab-${index}`}
                        aria-controls={`simple-tabpanel-${index}`}
                      />
                    ))}
                </Tabs>
              </Grid>

              <IconButton onClick={handleAddOrder} sx={{ margin: '4px 0' }}>
                <AddIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid className="selling-wrapper-content-item-product">
              {sellings[tabValue]?.details?.map((detail) => (
                <React.Fragment key={detail?.product?.id}>
                  {detail?.product?.id !== 0 && (
                    <>
                      <Grid container justifyContent={'space-between'} key={detail?.product?.id} className="mt12">
                        <IconButton onClick={() => handleOpenDiscount(detail?.product?.id)}>
                          {showDiscount === detail?.product?.id ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </IconButton>
                        <Grid item xs={2}>
                          <p className="center-col h-100  text-start">{getFlatAttribute(detail?.product)}</p>
                        </Grid>
                        <Grid container item lg={4}>
                          <IconButton onClick={() => handleMinusProduct(detail?.product?.id)}>
                            <RemoveIcon />
                          </IconButton>
                          <Grid xs={6} className="product-quantity">
                            <TextField
                              type="number"
                              className="center-col"
                              size="small"
                              value={detail.quantity}
                              onChange={(e) =>
                                handleChangeDetail(detail?.product?.id, 'quantity', parseInt(e.target.value))
                              }
                            />
                          </Grid>
                          <IconButton onClick={() => handleAddProduct(detail?.product?.id)}>
                            <AddIcon />
                          </IconButton>
                        </Grid>
                        <Grid xs={2}>
                          <p className="center-col h-100">X {detail.price.toLocaleString()} đ</p>
                        </Grid>
                        <Grid xs={2}>
                          <p className="center-col d-block h-100">
                            <p className={detail.discount ? 'old-price text-start' : 'center-col h-100'}>
                              {(detail.price * detail.quantity).toLocaleString()} đ
                            </p>
                            {detail.discount !== 0 && !Number.isNaN(detail?.discount) && (
                              <p className="text-start">
                                {(detail.price * detail.quantity * ((100 - detail.discount) / 100)).toLocaleString()} đ
                              </p>
                            )}
                          </p>
                        </Grid>
                        <IconButton onClick={() => handleDeleteProduct(detail?.product?.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                      <Collapse in={showDiscount === detail?.product?.id}>
                        <Grid container gap={3} className="selling-wrapper-content-item-product-colapse">
                          <p className="center-col">Giảm giá</p>
                          <TextField
                            size="small"
                            onChange={(e) =>
                              handleChangeDetail(detail?.product?.id, 'discount', parseInt(e.target.value))
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <p>%</p>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Collapse>
                      <Divider />
                    </>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={1} lg={2} className="selling-wrapper-content-item" sx={{ position: 'relative' }}>
            <FormControl fullWidth>
              <InputLabel id="select-inventory">Kho</InputLabel>
              <Select
                label="Kho"
                size="small"
                fullWidth
                labelId="select-inventory"
                value={sellings[tabValue]?.inventory?.id}
                onChange={(e) => {
                  const inventory = inventories.find((item) => item.id === (e.target.value as number));
                  handleSetFilter('inventoryId', e.target.value as number);
                  handleChangeSelling('inventory', inventory);
                }}
              >
                {inventories?.map((inventory) => (
                  <MenuItem key={inventory.id} value={inventory?.id}>
                    {inventory.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Autocomplete
                className="mt12"
                value={sellings[tabValue]?.customer} // Default value to empty string if customer or customer name is not present
                options={customerOptions}
                size="small"
                getOptionLabel={(option) => option.name} // Define how to get label from option
                onChange={(_, newValue) => {
                  handleChangeSelling('customer', newValue);

                  // Handle setting selected customer in your state or wherever it's needed
                }}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.name} +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn khách hàng"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                  />
                )}
              />
            </FormControl>
            <Bill
              ref={billref}
              selling={sellings[tabValue]}
              onChangeSelling={(title: string, value: any) => handleChangeSelling(title, value)}
            />
            <Grid className="selling-wrapper-content-item-pay-btn">
              <Button disabled={!activePayButton} variant="contained" onClick={handlePrint} className="no-print">
                Thanh toán
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default memo(SellingCreating);
