import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import driverData from '../data/mockDrivers';
import driverDetails from '../data/mockDriverDetailsCard';
import orderCards from '../data/mockOrders'; // <-- Add this line

const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onGet('/api/drivers').reply(200, driverData);
mock.onGet('/api/driver-details').reply(200, driverDetails);
mock.onGet('/api/orders').reply(200, orderCards); // <-- Add this line

export default axios;