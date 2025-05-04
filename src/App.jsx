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
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/product' element={<Products />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/:category/:productName' element={<ProductDetail />} />
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/cart' element={<Cart />} />
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/transfer-policy' element={<TransferPolicy/>}/>
            <Route path='/purchase-guide' element={<PurchaseGuide />} />
            <Route path='/return-policy' element={<ReturnPolicy />} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App
