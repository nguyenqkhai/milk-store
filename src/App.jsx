import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import Header from './components/header/Header'
import About from './components/about/About'
import Login from './pages/Login'
import Home from './components/home/Home'
import Products from './components/products/Products'

const Layout = ({ children }) => {
  const location = useLocation()
  const hideHeaderRoutes = ['/login']

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
    </>
  )
}

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/product' element={<Products />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
