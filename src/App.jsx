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
import Register from './pages/Auth/Register/Register';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import Payment from './pages/Payment/Payment';
import Checkout from './pages/Order/CheckOut';
import Cart from './pages/Cart/Cart';
import TransferPolicy from './components/footer/TransferPolicy';
import ReturnPolicy from './components/footer/ReturnPolicy';
import PurchaseGuide from './pages/Guide/PurchaseGuide';
import NotFound from './pages/NotFound/NotFound';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProfilePage from './pages/Profile/ProfilePage';
import OrderHistory from './pages/Order/History';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  return children;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
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

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        {/* Auth routes - redirect to home if already logged in */}
        <Route path='/dang-nhap' element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } />
        <Route path='/dang-ky' element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        } />
        
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/trang-chu' element={<Home />} />
        <Route path='/ve-chung-toi' element={<About />} />
        <Route path='/san-pham' element={<Products />} />
        <Route path='/lien-he' element={<Contact />} />
        <Route path="/san-pham/:id" element={<ProductDetail />} />
        <Route path='/chinh-sach-van-chuyen' element={<TransferPolicy />} />
        <Route path='/huong-dan-mua-hang' element={<PurchaseGuide />} />
        <Route path='/chinh-sach-doi-tra' element={<ReturnPolicy />} />
        <Route path='/lich-su-don-hang' element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        } />
        {/* Protected routes - require authentication */}
        <Route path='/thanh-toan' element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path='/gio-hang' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path='/xac-nhan-thanh-toan' element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
        <Route path='/thong-tin-ca-nhan' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        
        {/* 404 route */}
        <Route path='*' element={<NotFound />} />
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