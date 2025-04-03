import React, { useState } from 'react'
import { Search } from 'lucide-react'
import PropTypes from 'prop-types'

SearchBox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onSearchChange: PropTypes.func,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
}

function SearchBox({
  label,
  placeholder,
  onSearchChange,
  error,
  required,
  disabled,
}) {
  const [searchText, setSearchText] = useState('')

  const handleInputChange = e => {
    const text = e.target.value.trim()
    setSearchText(text)
    if (onSearchChange) onSearchChange(text)
  }

  return (
    <div className='mb-4 w-full'>
      {label && (
        <label
          className={`mb-2 block text-sm font-medium ${
            required
              ? 'after:ml-0.5 after:text-red-500 after:content-["*"]'
              : ''
          }`}
        >
          {label}
        </label>
      )}

      <div className='relative w-full'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <Search size={18} className='text-gray-500' />
        </div>

        <input
          type='text'
          value={searchText}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`right-0 left-0 w-full rounded-md border p-2 pl-8 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-text bg-white'} focus:border-blue-300 focus:ring focus:outline-none`}
        />
      </div>

      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  )
}

export default SearchBox
