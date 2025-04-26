import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import Header from './components/Header/Header'
import Login from './pages/Auth/Login'
import Home from './pages/Home/Home'
import Contact from './pages/contact/Contact'
import Products from './pages/Products/Products'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import About from './pages/About/About'
import Footer from './components/Footer/Footer'
import Payment from './pages/Payment/Payment'
import Checkout from './pages/Order/Checkout'
import Cart from './pages/Cart/Cart'
const Layout = ({ children }) => {
  const location = useLocation()
  const hideHeaderRoutes = ['/login', '/register', '/forgot-password']

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
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/product' element={<Products />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:slug' element={<ProductDetail />} />
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/cart' element={<Cart />} />
            <Route path='/payment' element={<Payment/>}/>
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App

