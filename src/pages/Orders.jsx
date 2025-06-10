import React from 'react';
import OrderRequestsCard from '../components/orders/ordersRequestCard';
import OrdersTable from '../components/orders/OrdersTable';

const Orders = () => (
  <div
    style={{
      display: 'flex',
      gap: 24,
      width: '100%',
      alignItems: 'flex-start'
    }}
  >
    <div style={{ flex: 1, minWidth: 0 }}>
      <OrdersTable />
    </div>
    <div>
      <OrderRequestsCard />
    </div>
  </div>
);

export default Orders;