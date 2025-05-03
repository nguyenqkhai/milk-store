import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import Payment from './pages/Payment/Payment';
import Checkout from './pages/Order/Checkout';
import Cart from './pages/Cart/Cart';
import TransferPolicy from './components/footer/TransferPolicy';
import ReturnPolicy from './components/footer/ReturnPolicy';
import PurchaseGuide from './pages/Guide/PurchaseGuide';
import NotFound from './pages/NotFound/NotFound';
import { AuthProvider, useAuth } from './context/AuthContext';

// Thêm component bảo vệ route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    // Chuyển hướng đến trang đăng nhập, lưu lại trang người dùng đang cố truy cập
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  return children;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderRoutes = ['/dang-nhap', '/dang-ky', '/quen-mat-khau', '/not-found'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

// Component AppRoutes bên trong AuthProvider
const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/dang-nhap' element={<Login />} />
        <Route path='/dang-ky' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/trang-chu' element={<Home />} />
        <Route path='/ve-chung-toi' element={<About />} />
        <Route path='/san-pham' element={<Products />} />
        <Route path='/lien-he' element={<Contact />} />
        <Route path='/:category/:productName' element={<ProductDetail />} />
        
        {/* Ví dụ các route cần xác thực */}
        <Route path='/thanh-toan' element={
          <ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>
        }/>
        <Route path='/gio-hang' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path='/xac-nhan-thanh-toan' element={
          <ProtectedRoute>
            <Payment/>
          </ProtectedRoute>
        }/>
        
        <Route path='/chinh-sach-van-chuyen' element={<TransferPolicy/>}/>
        <Route path='/huong-dan-mua-hang' element={<PurchaseGuide />} />
        <Route path='/chinh-sach-doi-tra' element={<ReturnPolicy />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;