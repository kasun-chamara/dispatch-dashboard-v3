import axios from 'axios';
export const fetchOrderDetail = () => axios.get('/api/order-detail');