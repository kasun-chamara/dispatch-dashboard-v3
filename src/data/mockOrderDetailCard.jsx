const deliverySummary = {
  orderId: "FD123456",
  customer: "Jane Doe",
  customerContact: "+44 123 456 7890",
  deliveryAddress: "123 High Street, London, SW1A 1AA, UK",
  orderTotal: "£22.50 (including £2.50 delivery fee)",
  paymentStatus: "Paid (Credit Card)",
  specialInstructions: "Leave at door, no contact delivery.",
  orderDetails: [
    { item: 'Margherita Pizza (12”) - £10.00', qty: 1 },
    { item: 'Pepperoni Pizza (12”) - £12.00', qty: 1 },
    { item: 'Garlic Bread - £3.00', qty: 1 }
  ],
  driver: {
    name: "Jane Doe",
    contact: "+44 123 456 7890",
    address: "123 High Street, London, SW1A 1AA, UK",
    activeOrders: 3,
    totalOrders: 12,
    payment: "Paid (Credit Card)",
    vehicle: "Toyota Vitz",
    vehicleNo: "DN60 TVL",
    shiftStart: "May 22, 2025 13:37",
    shiftEnd: "May 22, 2025 13:37"
  }
};

export default deliverySummary;