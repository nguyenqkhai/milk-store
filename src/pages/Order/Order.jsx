import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import OrderHistory from './History';
import OrderPending from './Pending';
import OrderConfirmed from './Confirmed';
import OrderShipping from './Shipping';
import { useOrderStore } from './OrderStore';

const items = [
  {
    label: 'Đang xử lý',
    key: 'PENDING',
    icon: <MailOutlined />,
  },
  {
    label: 'Đã xác nhận',
    key: 'CONFIRMED',
    icon: <AppstoreOutlined />
  },
  {
    label: 'Đang giao',
    key: 'SHIPPING',
    icon: <SettingOutlined />
  },
  {
    label: 'Lịch sử đơn hàng',
    key: 'HISTORY',
    icon: <SettingOutlined />
  }
];

const Order = () => {
  const {
    fetchOrdersShipping,
    fetchOrdersConfirmed,
    fetchOrdersHistory,
    fetchOrdersPending
  } = useOrderStore();
  useEffect(() => {
    const loadAllOrders = async () => {
      try {
        await Promise.all([
          fetchOrdersPending(),
          fetchOrdersConfirmed(),
          fetchOrdersShipping(),
          fetchOrdersHistory()
        ]);
      } catch (error) {

      }
    };

    loadAllOrders();
  }, [fetchOrdersPending, fetchOrdersConfirmed, fetchOrdersShipping, fetchOrdersHistory]);
  const [current, setCurrent] = useState('PENDING');

  const onClick = e => {
    setCurrent(e.key);
  };

  const renderContent = () => {
    switch (current) {
      case 'PENDING':
        return <OrderPending />;
      case 'CONFIRMED':
        return <OrderConfirmed />;
      case 'SHIPPING':
        return <OrderShipping />;
      case 'HISTORY':
        return <OrderHistory />;
      default:
        return <OrderPending />;

    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      />
      <div style={{ padding: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Order;