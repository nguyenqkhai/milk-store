import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { headerClass } from './data'
import { FiShoppingCart, FiSearch, FiUser } from 'react-icons/fi'
import SearchBox from '../Products/Search'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close search when location changes (user navigates to another page)
    setShowSearch(false)
  }, [location.pathname])

  const isActive = path => location.pathname === path

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = event => {
      const searchContainer = document.getElementById('search-container')
      const searchButton = document.getElementById('search-button')

      if (
        showSearch &&
        searchContainer &&
        !searchContainer.contains(event.target) &&
        searchButton &&
        !searchButton.contains(event.target)
      ) {
        setShowSearch(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSearch])

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
              to='/'
              className={`${headerClass.nav} ${isActive('/') ? 'font-semibold text-blue-600' : ''}`}
            >
              Trang chủ
            </Link>
            <Link
              to='/product'
              className={`${headerClass.nav} ${isActive('/product') ? 'font-semibold text-blue-600' : ''}`}
            >
              Sản phẩm
            </Link>
            <Link
              to='/about'
              className={`${headerClass.nav} ${isActive('/about') ? 'font-semibold text-blue-600' : ''}`}
            >
              Về chúng tôi
            </Link>
            <Link
              to='/contact'
              className={`${headerClass.nav} ${isActive('/contact') ? 'font-semibold text-blue-600' : ''}`}
            >
              Liên hệ
            </Link>
          </nav>

          {/* buttons */}
          <div className='flex items-center space-x-4'>
            <button
              id='search-button'
              onClick={() => setShowSearch(!showSearch)}
              className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 transition-all hover:bg-gray-100'
            >
              <FiSearch className='h-5 w-5' />
            </button>
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

      {/* Search dropdown that appears below the header */}
      {showSearch && (
        <div
          id='search-container'
          className='absolute right-0 left-0 z-10 mx-auto w-full max-w-3xl transform px-4 transition-all duration-300 ease-in-out'
          style={{
            top: isScrolled ? '4.5rem' : '5.5rem', // Adjust top based on header height
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <div className='rounded-lg bg-white p-4'>
            <SearchBox
              label='Tìm kiếm sản phẩm'
              placeholder='Nhập tên sản phẩm...'
              onSearchChange={text => console.log(text)}
              error={''}
              required={false}
              disabled={false}
            />
          </div>
        </div>
      )}

      {/* Add a spacer div when search is showing to prevent content overlap */}
      {showSearch && <div className='h-20'></div>}
    </>
  )
}

export default Header
