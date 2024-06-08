import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { Route } from 'react-router';
import './App.scss';
import { SignUpScreen } from './features/Auth/screens/SignUpScreen';
import Product from './features/Product/ProductsList';
import Dashboard from './features/Dashboard';
import ProductDetail from './features/Product/ProductDetail';
import ProductCreating from './features/Product/ProductCreating';
import RereiptProductList from './features/ReceiptProduct/RereiptProductList';
import {
  PATH_AUTH,
  PATH_INVENTORY_TAKE_CARE,
  PATH_PRODUCT,
  PATH_RECEIPT_PRODUCT,
  PATH_SELLING,
  PATH_STAFF,
} from './general/constants/path';
import ReceiptProductCreating from './features/ReceiptProduct/ReceiptProductCreating';
import ReceiptProductDetail from './features/ReceiptProduct/ReceiptProductDetail';
import InventoryInList from './features/InventoryIn/InventoryInList';
import StockTakeList from './features/StokeTake/StockTakeList';
import StockTakeEdit from './features/StokeTake/StockTakeEdit';
import StockTakeDetail from './features/StokeTake/StockTakeDetail';
import SignInScreen from './features/Auth/screens/SignInScreen';
import PrivateRoute from './route/PrivateRoute';
import StaffManament from './features/Staff/StaffManament';
import StaffEdit from './features/Staff/StaffEdit';
import useAuth from './hook/auth/useAuth';
import StaffDetail from './features/Staff/StaffDetail';
import SellCreating from './features/Selliing/SellCreating';
const theme = createTheme({
  typography: {
    fontFamily: ['Inter', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

const App: React.FC = () => {
  // const { logout } = useAuth();
  // const isLogged = sessionStorage.getItem('logged');
  // useEffect(() => {
  //   return () => {
  //     if (!isLogged) {
  //       logout();
  //     }
  //   };
  // });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path={'/' || '/main/management'} element={<Navigate to="/main/management/dashboard" />} />
            <Route
              path="/main/management/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_PRODUCT.PRODUCT_LIST_PATH}
              element={
                <PrivateRoute>
                  <Product />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_PRODUCT.PRODUCT_CREATE_PATH}
              element={
                <PrivateRoute>
                  <ProductCreating />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_PRODUCT.PRODUCT_DETAIL_PATH}
              element={
                <PrivateRoute>
                  <ProductDetail />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_LIST_PATH}
              element={
                <PrivateRoute>
                  <RereiptProductList />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_CREATE_PATH}
              element={
                <PrivateRoute>
                  <ReceiptProductCreating />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_RECEIPT_PRODUCT.RECEIPT_PRODUCT_DETAIL_PATH}
              element={
                <PrivateRoute>
                  <ReceiptProductDetail />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_RECEIPT_PRODUCT.INVENTORY_IN}
              element={
                <PrivateRoute>
                  <InventoryInList />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_LIST_PATH}
              element={
                <PrivateRoute>
                  <StockTakeList />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_EDIT_PATH}
              element={
                <PrivateRoute>
                  <StockTakeEdit />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_INVENTORY_TAKE_CARE.INVENTORY_TAKE_CARE_DETAIL_PATH}
              element={
                <PrivateRoute>
                  <StockTakeDetail />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_STAFF.STAFF_LIST_PATH}
              element={
                <PrivateRoute>
                  <StaffManament />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_STAFF.STAFF_EDIT_PATH}
              element={
                <PrivateRoute>
                  <StaffEdit />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_STAFF.STAFF_DETAIL_PATH}
              element={
                <PrivateRoute>
                  <StaffDetail />
                </PrivateRoute>
              }
            />
            <Route
              path={PATH_SELLING.SELLING_CREATING}
              element={
                <PrivateRoute>
                  <SellCreating />
                </PrivateRoute>
              }
            />
            <Route path={PATH_AUTH.LOGIN_PATH} element={<SignInScreen />} />
            <Route path="/account/sign-up" element={<SignUpScreen />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
