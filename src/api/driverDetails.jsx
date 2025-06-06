import axios from 'axios';

export const fetchDriverDetails = () => axios.get('/api/driver-details');