import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiEdit2, 
  FiSave, 
  FiX, 
  FiCalendar,
  FiCamera
} from 'react-icons/fi';

const General = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    address: user?.address || "",
    birthday: user?.birthday || "",
    fullName: user?.fullName || "",
    bio: user?.bio || ""
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save changes
  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditForm({
      username: user?.username || "",
      phone: user?.phone || "",
      address: user?.address || "",
      birthday: user?.birthday || "",
      fullName: user?.fullName || "",
      bio: user?.bio || ""
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Vui lòng đăng nhập để xem thông tin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/30">
              {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
              <FiCamera size={18} className="text-gray-600" />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">
              {user.fullName || user.username || "Chưa cập nhật tên"}
            </h1>
            <p className="text-blue-100 mt-1">{user.email}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                Thành viên từ 2024
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                ID: #{user.id || '001'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Thông tin cá nhân</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
            >
              <FiEdit2 size={16} />
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                <FiSave size={16} />
                Lưu
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                <FiX size={16} />
                Hủy
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập họ và tên"
                />
              ) : (
                <div className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                  {user.fullName || "Chưa cập nhật"}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên đăng nhập
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tên đăng nhập"
                />
              ) : (
                <div className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                  {user.username || "Chưa cập nhật"}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <div className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                {user.email || "Chưa cập nhật"}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">* Email không thể chỉnh sửa</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập số điện thoại"
                />
              ) : (
                <div className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                  {user.phone || "Chưa cập nhật"}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày sinh
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              {isEditing ? (
                <input
                  type="date"
                  name="birthday"
                  value={editForm.birthday}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <div className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                  {user.birthday || "Chưa cập nhật"}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-3 text-gray-400" size={18} />
              {isEditing ? (
                <textarea
                  name="address"
                  value={editForm.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập địa chỉ của bạn"
                />
              ) : (
                <div className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 min-h-[88px]">
                  {user.address || "Chưa cập nhật"}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giới thiệu về bản thân
            </label>
            <div className="relative">
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Viết vài dòng giới thiệu về bản thân..."
                />
              ) : (
                <div className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 min-h-[100px]">
                  {user.bio || "Chưa có giới thiệu"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General; 