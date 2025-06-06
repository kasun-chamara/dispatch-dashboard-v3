import React from 'react';
import DriversTable from '../components/drivers/DriversTable';
import DriverDetailsRequests from '../components/drivers/driverDetailCard';

const Drivers = () => (
  <div style={{ display: 'flex', gap: 24, width: '100%' }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <DriversTable />
    </div>
    <div>
      <DriverDetailsRequests />
    </div>
  </div>
);

export default Drivers;