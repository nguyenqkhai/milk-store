import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { headerClass } from './data'
import { FiShoppingCart, FiUser } from 'react-icons/fi'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = path => location.pathname === path

  return (
    <>
      <header
        className={`${headerClass.header} ${isScrolled ? 'py-3 shadow-lg' : 'py-5 shadow-sm'} relative z-20 transition-all duration-300`}
      >
        <div className='container mx-auto flex items-center justify-between'>
          {/* logo */}
          <Link to='/' className='flex items-center'>
            <div className='relative'>
              <span className='absolute -top-2 -left-1 text-4xl'>🥛</span>
              <h1 className='ml-9 text-2xl font-extrabold tracking-wide text-blue-700 sm:text-3xl'>
                Milk<span className='text-blue-500'>Store</span>
              </h1>
            </div>
          </Link>

          {/* navigation */}
          <nav className='flex items-center space-x-8'>
            <Link
              to='/trang-chu'
              className={`${headerClass.nav} ${isActive('/') ? 'font-semibold text-blue-600' : ''}`}
            >
              Trang chủ
            </Link>
            <Link
              to='/san-pham'
              className={`${headerClass.nav} ${isActive('/product') ? 'font-semibold text-blue-600' : ''}`}
            >
              Sản phẩm
            </Link>
            <Link
              to='/ve-chung-toi'
              className={`${headerClass.nav} ${isActive('/about') ? 'font-semibold text-blue-600' : ''}`}
            >
              Về chúng tôi
            </Link>
            <Link
              to='/lien-he'
              className={`${headerClass.nav} ${isActive('/contact') ? 'font-semibold text-blue-600' : ''}`}
            >
              Liên hệ
            </Link>
          </nav>

          {/* buttons */}
          <div className='flex items-center space-x-4'>
            <button className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 transition-all hover:bg-gray-100'>
              <Link to='/login'>
                <FiUser className='h-5 w-5' />
              </Link>
            </button>
            <button
              className={`${headerClass.button} flex cursor-pointer items-center gap-2`}
            >
              <FiShoppingCart className='h-5 w-5' />
              <span className='hidden sm:inline'>Giỏ hàng</span>
              <span className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-blue-700'>
                3
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
