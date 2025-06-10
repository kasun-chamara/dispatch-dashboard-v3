import axios from 'axios';
export const fetchOrdersTable = () => axios.get('/api/orders-table');