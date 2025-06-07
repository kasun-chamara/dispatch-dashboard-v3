import React from 'react';
import DeliveriesTable from '../components/deliveries/DeliveriesTable';
import DeliveriesSummery from '../components/orders/orderDetailCard';

const Deliveries = () => (
  <div
    style={{
      display: 'flex',
      gap: 24,
      width: '100%',
      alignItems: 'flex-start',
      
    }}
  >
    <div style={{ flex: 1, minWidth: 0 }}>
      <DeliveriesTable />
    </div>
    <div>
      <DeliveriesSummery />
    </div>
  </div>
);

export default Deliveries;