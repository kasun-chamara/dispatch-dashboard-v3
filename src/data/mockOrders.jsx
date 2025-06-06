const orderCards = [
  {
    orderId: 'ORD-1001',
    time: '2024-05-27 14:32',
    customer: 'John Doe',
    customerContact: '+44 1234 567890',
    deliveryAddress: '221B Baker Street, London',
    orderTotal: '£32.50',
    paymentStatus: 'Paid',
    specialInstructions: 'Leave at the door.',
    orderDetails: [
      { item: 'Margherita Pizza', qty: 1 },
      { item: 'Garlic Bread', qty: 2 },
      { item: 'Coke', qty: 1 }
    ]
  },
  {
    orderId: 'ORD-1002',
    time: '2024-05-27 15:10',
    customer: 'Jane Smith',
    customerContact: '+44 9876 543210',
    deliveryAddress: '10 Downing Street, London',
    orderTotal: '£21.00',
    paymentStatus: 'Pending',
    specialInstructions: 'Ring the bell twice.',
    orderDetails: [
      { item: 'Pepperoni Pizza', qty: 1 },
      { item: 'Salad', qty: 1 }
    ]
  }
];

export default orderCards;