import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  FiUser, 
  FiSettings, 
  FiShield, 
  FiShoppingBag,
  FiHeart,
  FiLogOut,
  FiChevronRight,
  FiArrowLeft,
  FiBell,
  FiCreditCard
} from 'react-icons/fi';

import General from './General';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('general');

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Chưa đăng nhập</h2>
            <p className="text-gray-600 mb-6">
              Vui lòng đăng nhập để xem thông tin cá nhân và quản lý tài khoản của bạn.
            </p>
            <Link 
              to="/dang-nhap"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      id: 'general',
      label: 'Thông tin cá nhân',
      icon: <FiUser size={18} />,
      component: <General />
    },
    {
      id: 'orders',
      label: 'Đơn hàng của tôi',
      icon: <FiShoppingBag size={18} />,
      onClick: () => navigate('/don-hang')
    },
    {
      id: 'wishlist',
      label: 'Sản phẩm yêu thích',
      icon: <FiHeart size={18} />,
      onClick: () => navigate('/yeu-thich')
    },
    {
      id: 'notifications',
      label: 'Thông báo',
      icon: <FiBell size={18} />,
      onClick: () => navigate('/thong-bao')
    },
    {
      id: 'payment',
      label: 'Thanh toán',
      icon: <FiCreditCard size={18} />,
      onClick: () => navigate('/thanh-toan')
    }
  ];

  const handleMenuClick = (item) => {
    if (item.onClick) {
      item.onClick();
    } else {
      setActiveTab(item.id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/dang-nhap');
  };

  const activeMenuItem = menuItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Back Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft size={20} />
            <span>Quay lại</span>
          </button>
        </div>

        {/* Header - Mobile */}
        <div className="md:hidden mb-6">
          <h1 className="text-xl font-bold text-gray-900">Tài khoản của tôi</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {user.fullName || user.username || 'Người dùng'}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="mt-6 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id && item.component
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <FiChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}

                {/* Đăng xuất */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <FiLogOut size={18} />
                    <span className="text-sm font-medium">Đăng xuất</span>
                  </div>
                  <FiChevronRight size={16} className="text-gray-400" />
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            {activeMenuItem?.component || (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {activeMenuItem?.label || 'Trang không tồn tại'}
                </h2>
                <p className="text-gray-500">
                  Nội dung đang được cập nhật...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;