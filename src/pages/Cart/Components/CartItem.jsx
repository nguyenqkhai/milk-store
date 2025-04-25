import React from 'react'

const CartItem = ({ item, handleUpdateQuantity, handleRemoveItem }) => {
  return (
    <div className='relative grid grid-cols-12 items-center gap-4 border-b border-gray-100 py-4'>
      <div className='col-span-6'>
        <div className='flex items-center gap-4'>
          <img
            src={item.image}
            alt={item.name}
            className='h-20 w-20 rounded-lg object-cover'
          />
          <div>
            <h3 className='font-medium'>{item.name}</h3>
            {/* <p className="text-sm text-gray-500 mt-1">Color: {item.color}</p> */}
            {/* <p className='text-sm text-gray-500'>Size: {item.size}</p> */}
          </div>
        </div>
      </div>
      <div className='col-span-2 text-center'>${item.price.toFixed(2)}</div>
      <div className='col-span-2'>
        <div className='flex items-center justify-center'>
          <button
            className='flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100'
            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <input
            type='text'
            className='mx-1 h-8 w-12 border border-gray-300 text-center'
            value={item.quantity}
            readOnly
          />
          <button
            className='flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100'
            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className='col-span-2 text-center font-medium'>
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button
        onClick={() => handleRemoveItem(item.id)}
        className='absolute right-0 text-xl text-pink-500 hover:text-pink-700'
      >
        ×
      </button>
    </div>
  )
}

export default CartItem
