import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import driverData from '../data/mockDrivers';
import driverDetails from '../data/mockDriverDetailsCard';
import orderCards from '../data/mockOrders';
import orderDetail from '../data/mockOrderDetailCard';
import deliveriesData from '../data/mockDeliveries'; // <-- Add this line

const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onGet('/api/drivers').reply(200, driverData);
mock.onGet('/api/driver-details').reply(200, driverDetails);
mock.onGet('/api/orders').reply(200, orderCards);
mock.onGet('/api/order-detail').reply(200, orderDetail);
mock.onGet('/api/deliveries').reply(200, deliveriesData); // <-- Add this line

export default axios;