import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Form, Input, DatePicker, Select, Button, message, Spin, Upload } from 'antd';
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiEdit } from 'react-icons/fi';
import moment from 'moment';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  const { Option } = Select;

  useEffect(() => {
    if (currentUser?.data) {
      setUserData(currentUser.data);
      if (isEditing) {
        form.setFieldsValue({
          surname: currentUser.data.surname,
          middleName: currentUser.data.middleName,
          firstName: currentUser.data.firstName,
          phoneNumber: currentUser.data.phoneNumber,
          address: currentUser.data.address,
          email: currentUser.data.email,
          gender: currentUser.data.gender,
          dob: currentUser.data.dob ? moment(currentUser.data.dob) : null,
        });
      }
    }
  }, [currentUser, form, isEditing]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
      };

      console.log('Submitting form with values:', formattedValues);

      message.success('Cập nhật thông tin thành công!');
      setIsEditing(false);
      setUserData({
        ...userData,
        ...formattedValues
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Không thể cập nhật thông tin. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const renderUserInfo = () => {
    if (!userData) return <Spin />;

    const { surname, middleName, firstName, email, phoneNumber, address, gender, dob } = userData;
    const fullName = `${surname} ${middleName} ${firstName}`;

    return (
      <div className="space-y-6">
        {/* User info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiUser className="text-blue-600 text-xl" />
              <h3 className="text-lg font-medium text-gray-800">Thông tin cá nhân</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Họ và tên</p>
                <p className="font-medium">{fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Giới tính</p>
                <p>{gender || 'Chưa cập nhật'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngày sinh</p>
                <p>{dob ? moment(dob).format('DD/MM/YYYY') : 'Chưa cập nhật'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiPhone className="text-blue-600 text-xl" />
              <h3 className="text-lg font-medium text-gray-800">Thông tin liên hệ</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Số điện thoại</p>
                <p>{phoneNumber || 'Chưa cập nhật'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Địa chỉ</p>
                <p>{address || 'Chưa cập nhật'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    if (!userData) return <Spin />;
    
    return (
      <div className="px-9 py-9 bg-white rounded-lg shadow">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            surname: userData.surname,
            middleName: userData.middleName,
            firstName: userData.firstName,
            phoneNumber: userData.phoneNumber,
            address: userData.address,
            email: userData.email,
            gender: userData.gender,
            dob: userData.dob ? moment(userData.dob) : null,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="surname"
              label="Họ"
              rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
            >
              <Input prefix={<FiUser className="text-gray-400" />} placeholder="Nhập họ" />
            </Form.Item>

            <Form.Item
              name="middleName"
              label="Tên đệm"
            >
              <Input prefix={<FiUser className="text-gray-400" />} placeholder="Nhập tên đệm" />
            </Form.Item>

            <Form.Item
              name="firstName"
              label="Tên"
              rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
            >
              <Input prefix={<FiUser className="text-gray-400" />} placeholder="Nhập tên" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input prefix={<FiMail className="text-gray-400" />} placeholder="Nhập email" disabled />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 chữ số' }
              ]}
            >
              <Input prefix={<FiPhone className="text-gray-400" />} placeholder="Nhập số điện thoại" />
            </Form.Item>
          </div>

          <Form.Item
            name="address"
            label="Địa chỉ"
          >
            <Input prefix={<FiMapPin className="text-gray-400" />} placeholder="Nhập địa chỉ" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="gender"
              label="Giới tính"
            >
              <Select placeholder="Chọn giới tính">
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
                <Option value="Khác">Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dob"
              label="Ngày sinh"
            >
              <DatePicker
                format="DD/MM/YYYY"
                className="w-full"
                placeholder="Chọn ngày sinh"
                suffixIcon={<FiCalendar className="text-gray-400" />}
              />
            </Form.Item>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button onClick={() => setIsEditing(false)}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu thông tin
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Thông tin cá nhân</h1>
        <p className="text-gray-600">Xem và cập nhật thông tin cá nhân của bạn</p>
      </div>

      <div className="mb-8 bg-white rounded-lg shadow p-6 flex flex-col items-center sm:flex-row sm:items-start">
        <div className="w-32 h-32 mb-4 sm:mb-0 sm:mr-8">
          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
            <FiUser className="h-16 w-16 text-blue-600" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-semibold">
            {userData ?
              `${userData.surname} ${userData.middleName} ${userData.firstName}` :
              'Đang tải...'}
          </h2>
          <p className="text-gray-600 mt-1">{userData?.email}</p>
          <p className="text-gray-500 mt-1">{userData?.phoneNumber || 'Chưa cập nhật số điện thoại'}</p>

          {!isEditing && (
            <Button
              type="primary"
              icon={<FiEdit className="mr-1" />}
              onClick={() => setIsEditing(true)}
              className="mt-4"
            >
              Chỉnh sửa thông tin
            </Button>
          )}
        </div>
      </div>

      {isEditing ? renderForm() : renderUserInfo()}
    </div>
  );
};

export default ProfilePage;