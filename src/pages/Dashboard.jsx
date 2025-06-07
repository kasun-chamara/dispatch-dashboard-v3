import React from 'react';
import OrderRequestsCard from '../components/orders/ordersRequestCard';
import Map from '../components/dashboard/Map';
import DriversTable from '../components/drivers/DriversTable';

const Dashboard = () => (
  <div style={{ display: 'flex', gap: 24, width: '100%' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
      {/* Map fills available width */}
      <div style={{ flex: 1, minHeight: 350, minWidth: 0 }}>
        <Map />
      </div>
      <DriversTable />
    </div>
    <div>
      <OrderRequestsCard />
    </div>
  </div>
);

export default Dashboard;