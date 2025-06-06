import axios from 'axios';

export const fetchDrivers = () => axios.get('/api/drivers');
