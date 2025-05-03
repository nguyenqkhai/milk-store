import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import Header from './components/Header/Header'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import Products from './pages/Products/Products'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import About from './pages/About/About'
import Footer from './components/Footer/Footer'
import Payment from './pages/Payment/Payment'
import Checkout from './pages/Order/Checkout'
import Cart from './pages/Cart/Cart'
import TransferPolicy from './components/footer/TransferPolicy'
import ReturnPolicy from './components/footer/ReturnPolicy'
import PurchaseGuide from './pages/Guide/PurchaseGuide'
import NotFound from './pages/NotFound/NotFound'
import { AuthProvider } from './context/AuthContext'

const Layout = ({ children }) => {
  const location = useLocation()
  const hideHeaderRoutes = ['/login', '/register', '/forgot-password', '/not-found']

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  )
}

const App = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/trang-chu' element={<Home />} />
            <Route path='/dang-nhap' element={<Login />} />
            <Route path='/ve-chung-toi' element={<About />} />
            <Route path='/san-pham' element={<Products />} />
            <Route path='/lien-he' element={<Contact />} />
            <Route path='/:category/:productName' element={<ProductDetail />} />
            <Route path='/thanh-toan' element={<Checkout/>}/>
            <Route path='/gio-hang' element={<Cart />} />
            <Route path='/xac-nhan-thanh-toan' element={<Payment/>}/>
            <Route path='/chinh-sach-van-chuyen' element={<TransferPolicy/>}/>
            <Route path='/huong-dan-mua-hang' element={<PurchaseGuide />} />
            <Route path='/chinh-sach-doi-tra' element={<ReturnPolicy />} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App
