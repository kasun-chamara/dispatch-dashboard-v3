import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../../api/orders';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgress, Avatar, MenuItem, Select, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const driverData = [
  { id: 1, name: 'John Driver', avatar: 'JD', rating: 4.8, status: 'available' },
  { id: 2, name: 'Mike Wheeler', avatar: 'MW', rating: 4.5, status: 'on delivery' },
  { id: 3, name: 'Sarah Connor', avatar: 'SC', rating: 4.9, status: 'available' },
  { id: 4, name: 'Alex Morgan', avatar: 'AM', rating: 4.7, status: 'on break' }
];

const OrderCard = ({ order, isDark, onAssign }) => {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assigned, setAssigned] = useState(false);

  const handleAssign = () => {
    if (!selectedDriver) return;
    
    setIsAssigning(true);
    setTimeout(() => {
      setIsAssigning(false);
      setAssigned(true);
      onAssign(order.orderId, selectedDriver);
      setTimeout(() => setAssigned(false), 2000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        border: isDark ? '1px solid rgba(0, 0, 0, 0.18)' : '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 14,
        padding: 16,
        marginBottom: 18,
        background: isDark
          ? 'rgba(11,36,71,0.55)'
          : 'rgba(255,255,255,0.85)',
        fontSize: 14,
        color: isDark ? '#fff' : '#222',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            background: isDark ? 'rgba(0,123,255,0.2)' : 'rgba(0,123,255,0.1)',
            borderRadius: 6,
            padding: '4px 8px',
            fontWeight: 600,
            color: '#007bff'
          }}>
            #{order.orderId}
          </div>
          {order.priority === 'high' && (
            <div style={{
              background: 'rgba(220,53,69,0.1)',
              borderRadius: 6,
              padding: '4px 8px',
              fontWeight: 500,
              color: '#dc3545',
              fontSize: 12
            }}>
              Priority
            </div>
          )}
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 4,
          color: isDark ? '#bbb' : '#888',
          fontSize: 12
        }}>
          <AccessTimeIcon fontSize="inherit" />
          {order.time}
        </div>
      </div>

      <div style={{ 
        borderTop: isDark ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(0,0,0,0.1)',
        margin: '12px 0',
        opacity: 0.5
      }}></div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Avatar sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: isDark ? '#3556a3' : '#007bff',
            fontSize: 14
          }}>
            {order.customer.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{order.customer}</div>
            <div style={{ 
              fontSize: 12, 
              color: isDark ? '#bbb' : '#888',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              {order.customerContact}
            </div>
          </div>
        </div>

        <div style={{ 
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          borderRadius: 8,
          padding: 10,
          marginBottom: 12
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6,
            marginBottom: 6,
            fontSize: 13
          }}>
            <LocalShippingIcon fontSize="small" color={isDark ? 'disabled' : 'action'} />
            <span style={{ fontWeight: 500 }}>Delivery Address:</span>
          </div>
          <div style={{ fontSize: 13, color: isDark ? '#ddd' : '#555' }}>
            {order.deliveryAddress}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: 6,
          fontSize: 13
        }}>
          <span style={{ color: isDark ? '#bbb' : '#888' }}>Order Total:</span>
          <span style={{ fontWeight: 600 }}>{order.orderTotal}</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: 6,
          fontSize: 13
        }}>
          <span style={{ color: isDark ? '#bbb' : '#888' }}>Payment Status:</span>
          <span style={{ 
            color: order.paymentStatus === 'Paid' ? '#28a745' : '#dc3545',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            {order.paymentStatus === 'Paid' ? (
              <CheckCircleIcon fontSize="inherit" />
            ) : (
              <CancelIcon fontSize="inherit" />
            )}
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {order.specialInstructions && (
        <div style={{ 
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,193,7,0.1)',
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
          border: isDark ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(255,193,7,0.3)'
        }}>
          <div style={{ 
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 4,
            color: isDark ? '#ffc107' : '#ff9800'
          }}>
            Special Instructions
          </div>
          <div style={{ fontSize: 13, color: isDark ? '#ddd' : '#555' }}>
            {order.specialInstructions}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 500, marginBottom: 8 }}>Order Items:</div>
        <div style={{ 
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderRadius: 8,
          padding: '8px 0'
        }}>
          {order.orderDetails.map((item, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '6px 12px',
              fontSize: 13
            }}>
              <span>
                {item.item} 
                <span style={{ color: isDark ? '#bbb' : '#888', marginLeft: 4 }}>
                  x{item.qty}
                </span>
              </span>
              <span style={{ fontWeight: 500 }}>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: assigned ? 0 : 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <Select
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          displayEmpty
          fullWidth
          size="small"
          sx={{
            '& .MuiSelect-select': {
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? '#3556a3' : '#bbb'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? '#4a6fca' : '#999'
            },
            backgroundColor: isDark ? 'rgba(11,36,71,0.7)' : '#fff',
            color: isDark ? '#fff' : '#222'
          }}
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: isDark ? '#bbb' : '#888' }}>Select driver</span>;
            }
            const driver = driverData.find(d => d.name === selected);
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: isDark ? '#3556a3' : '#007bff',
                  fontSize: 12
                }}>
                  {driver.avatar}
                </Avatar>
                <span>{selected}</span>
              </div>
            );
          }}
        >
          <MenuItem value="" disabled>
            <em>Select driver</em>
          </MenuItem>
          {driverData.map((driver) => (
            <MenuItem key={driver.id} value={driver.name} sx={{ fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                <Avatar sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: isDark ? '#3556a3' : '#007bff',
                  fontSize: 12
                }}>
                  {driver.avatar}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div>{driver.name}</div>
                  <div style={{ 
                    fontSize: 11, 
                    color: isDark ? '#bbb' : '#888',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <span>⭐ {driver.rating}</span>
                    <span>•</span>
                    <span style={{ 
                      color: driver.status === 'available' ? '#28a745' : 
                            driver.status === 'on delivery' ? '#fd7e14' : '#6c757d'
                    }}>
                      {driver.status}
                    </span>
                  </div>
                </div>
              </div>
            </MenuItem>
          ))}
        </Select>

        <motion.button
          onClick={handleAssign}
          disabled={!selectedDriver || isAssigning}
          whileHover={{ scale: selectedDriver && !isAssigning ? 1.03 : 1 }}
          whileTap={{ scale: selectedDriver && !isAssigning ? 0.98 : 1 }}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            background: selectedDriver ? 
              (isAssigning ? 'rgba(0,123,255,0.7)' : '#007bff') : 
              (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'),
            color: selectedDriver ? '#fff' : (isDark ? '#bbb' : '#888'),
            border: 'none',
            fontSize: 13,
            fontWeight: 500,
            cursor: selectedDriver ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            minWidth: 90,
            justifyContent: 'center',
            opacity: selectedDriver ? 1 : 0.7
          }}
        >
          {isAssigning ? (
            <>
              <CircularProgress size={14} thickness={5} sx={{ color: '#fff' }} />
              Assigning...
            </>
          ) : 'Assign'}
        </motion.button>
      </motion.div>

      {assigned && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(40,167,69,0.9)',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            zIndex: 2
          }}
        >
          <CheckCircleIcon fontSize="small" />
          Assigned to {selectedDriver}
        </motion.div>
      )}
    </motion.div>
  );
};

const OrderRequestsCard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders().then(res => {
        setOrders(res.data);
        setLoading(false);
      });
    }, 1500); // Simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  const handleAssign = (orderId, driverName) => {
    // In a real app, you would call an API here
    console.log(`Order ${orderId} assigned to ${driverName}`);
  };

  const filteredOrders = orders.filter(order => 
    order.orderId.toString().includes(searchTerm) || 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: 380,
        width: '100%',
        flex: '0 0 380px',
        height: 'calc(100vh - 40px)',
        maxHeight: 800,
        background: isDark
          ? 'rgba(11,36,71,0.7)'
          : 'rgba(255,255,255,0.9)',
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <div style={{ 
          display: '', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: 16,
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
        }}>
          <h3 style={{ 
            margin: 0, 
            color: isDark ? '#fff' : '#222',
            fontSize: 20,
            fontWeight: 600
          }}>
            Order Requests
          </h3>
          <div style={{ 
            background: isDark ? 'rgba(0,123,255,0.2)' : 'rgba(0,123,255,0.1)',
            borderRadius: 12,
            padding: '4px 10px',
            fontSize: 12,
            fontWeight: 600,
            color: '#007bff'
          }}>
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
          </div>
        </div>

        <TextField
          placeholder="Search orders..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color={isDark ? 'disabled' : 'action'} />
              </InputAdornment>
            ),
            sx: {
              '& .MuiOutlinedInput-input': {
                fontSize: 14,
                padding: '8.5px 14px'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? '#3556a3' : '#ccc'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? '#4a6fca' : '#999'
              },
              backgroundColor: isDark ? 'rgba(11,36,71,0.7)' : '#fff',
              borderRadius: 12,
              color: isDark ? '#fff' : '#222'
            }
          }}
        />
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        paddingRight: 4,
        marginRight: -8,
        scrollbarWidth: 'thin',
        scrollbarColor: isDark ? '#3556a3 transparent' : '#007bff transparent',
      }}>
        {loading ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: isDark ? '#fff' : '#222'
          }}>
            <CircularProgress size={40} thickness={4} sx={{ mb: 2, color: isDark ? '#3556a3' : '#007bff' }} />
            <div style={{ fontSize: 14 }}>Loading orders...</div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            textAlign: 'center',
            color: isDark ? '#bbb' : '#888',
            padding: 20
          }}>
            <SearchIcon fontSize="large" sx={{ mb: 1, opacity: 0.5 }} />
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>No orders found</div>
            <div style={{ fontSize: 13 }}>{searchTerm ? 'Try a different search term' : 'No orders available at the moment'}</div>
          </div>
        ) : (
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <OrderCard 
                key={order.orderId} 
                order={order} 
                isDark={isDark} 
                onAssign={handleAssign}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default OrderRequestsCard;