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
import ProductAttribute from './features/Product/ProductAttribute';
import ProductCreating from './features/Product/ProductCreating';
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
            <Route path={'/' || '/admin'} element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Product />} />
            <Route path="/admin/products/creating" element={<ProductCreating />} />
            <Route path="/admin/products/:id" element={<ProductDetail />} />
            <Route path="/admin/products/:id/attribute/:attributeId" element={<ProductAttribute />} />
            <Route path="/sign-in" element={<SignInScreen />} />
            <Route path="/sign-up" element={<SignUpScreen />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
