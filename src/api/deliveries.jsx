import axios from 'axios';
export const fetchDeliveries = () => axios.get('/api/deliveries');