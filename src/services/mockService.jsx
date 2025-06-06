import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import driverData from '../data/mockDrivers';
import driverDetails from '../data/mockDriverDetailsCard';

const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onGet('/api/drivers').reply(200, driverData);
mock.onGet('/api/driver-details').reply(200, driverDetails);

export default axios;