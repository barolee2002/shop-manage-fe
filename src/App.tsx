import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { Route } from 'react-router';
import './App.scss';
import { SignInScreen } from './features/Auth/screens/SignInScreen';
import { SignUpScreen } from './features/Auth/screens/SignUpScreen';
import Product from './features/Product/ProductsList';
import Dashboard from './features/Dashboard';
import ProductDetail from './features/Product/ProductDetail';
import ProductCreating from './features/Product/ProductCreating';
import RereiptProductList from './features/ReceiptProduct/RereiptProductList';
import { PATH_INVENTORY_TAKE_CARE, PATH_PRODUCT, PATH_RECEIPT_PRODUCT } from './general/constants/path';
import ReceiptProductCreating from './features/ReceiptProduct/ReceiptProductCreating';
import ReceiptProductDetail from './features/ReceiptProduct/ReceiptProductDetail';
import InventoryInList from './features/InventoryIn/InventoryInList';
import StockTakeList from './features/StokeTake/StockTakeList';
import StockTakeEdit from './features/StokeTake/StockTakeEdit';
const theme = createTheme({
  typography: {
    fontFamily: ['Inter', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

const App: React.FC = () => {
  React.useEffect(() => {
    return  () => {
    }
  },[])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path={'/' || '/main/management'} element={<Navigate to="/main/management/dashboard" />} />
            <Route path="/main/management/dashboard" element={<Dashboard />} />
            <Route path={PATH_PRODUCT.PRODUCT_LIST_PATH} element={<Product />} />
            <Route path={PATH_PRODUCT.PRODUCT_CREATE_PATH} element={<ProductCreating />} />
            <Route path={PATH_PRODUCT.PRODUCT_DETAIL_PATH} element={<ProductDetail />} />
            <Route path={PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_LIST_PATH} element={<RereiptProductList />} />
            <Route path={PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_CREATE_PATH} element={<ReceiptProductCreating />} />
            <Route path={PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_DETAIL_PATH} element={<ReceiptProductDetail />} />
            <Route path={PATH_RECEIPT_PRODUCT.INVENTORY_IN} element={<InventoryInList />} />
            <Route path={PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_LIST_PATH} element={<StockTakeList />} />
            <Route path={PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_EDIT_PATH} element={<StockTakeEdit />} />

            <Route path="/account/sign-in" element={<SignInScreen />} />
            <Route path="/account/sign-up" element={<SignUpScreen />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
