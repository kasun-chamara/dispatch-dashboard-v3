import React, { useState } from 'react';
import OrderRequestsCard from '../components/orders/ordersRequestCard';
import Map from '../components/dashboard/Map';
import DriversTable from '../components/drivers/DriversTable';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('map'); // 'map' or 'drivers'

  return (
    <div style={{ display: 'flex', gap: 24, width: '100%' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Buttons to toggle views */}
        <div>
          <button
            onClick={() => setActiveView('map')}
            style={{
              padding: '8px 16px',
              marginRight: 8,
              backgroundColor: activeView === 'map' ? '#1976d2' : '#e0e0e0',
              color: activeView === 'map' ? '#fff' : '#000',
              border: 'none',
              borderRadius: 15,
              cursor: 'pointer',
            }}
          >
            Map
          </button>
          <button
            onClick={() => setActiveView('drivers')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeView === 'drivers' ? '#1976d2' : '#e0e0e0',
              color: activeView === 'drivers' ? '#fff' : '#000',
              border: 'none',
              borderRadius: 15,
              cursor: 'pointer',
            }}
          >
            Drivers
          </button>
        </div>

        {/* Show Map or DriversTable depending on activeView */}
        <div style={{ flex: 1, minHeight: 350, minWidth: 0 }}>
          {activeView === 'map' ? <Map /> : <DriversTable />}
        </div>
      </div>

      <div>
        <OrderRequestsCard />
      </div>
    </div>
  );
};

export default Dashboard;
