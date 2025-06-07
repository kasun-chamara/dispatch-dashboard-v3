import React, { useEffect, useState } from 'react';
import { fetchOrderDetail } from '../../api/orderDetail';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgress, Avatar } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PaymentIcon from '@mui/icons-material/Payment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const DeliveriesSummary = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [deliverySummary, setDeliverySummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrderDetail().then(res => {
        setDeliverySummary(res.data);
        setLoading(false);
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const trackingSteps = [
    { 
      label: 'Order Placed', 
      time: deliverySummary?.orderTime || 'May 22, 2025 13:37',
      completed: true,
      icon: <AssignmentIcon fontSize="small" />
    },
    { 
      label: 'Assigned', 
      time: deliverySummary?.assignedTime || 'May 22, 2025 13:42',
      completed: true,
      icon: <LocalShippingIcon fontSize="small" />
    },
    { 
      label: 'Picked Up', 
      time: deliverySummary?.pickedUpTime || 'May 22, 2025 13:58',
      completed: true,
      icon: <ShoppingBasketIcon fontSize="small" />
    },
    { 
      label: 'En Route', 
      time: deliverySummary?.enRouteTime || 'May 22, 2025 14:05',
      completed: true,
      icon: <DirectionsCarIcon fontSize="small" />
    },
    { 
      label: 'At the Door', 
      time: deliverySummary?.atDoorTime || 'N/A',
      completed: false,
      icon: <HomeIcon fontSize="small" />
    },
    { 
      label: 'Delivered', 
      time: deliverySummary?.deliveredTime || 'N/A',
      completed: false,
      icon: <DoneAllIcon fontSize="small" />
    }
  ];

  if (loading) {
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
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          color: isDark ? '#fff' : '#222'
        }}>
          <CircularProgress size={40} thickness={4} sx={{ mb: 2, color: isDark ? '#3556a3' : '#007bff' }} />
          <div style={{ fontSize: 14 }}>Loading order details...</div>
        </div>
      </motion.div>
    );
  }

  if (!deliverySummary) return null;

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
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ 
          margin: 0, 
          color: isDark ? '#fff' : '#222',
          fontSize: 20,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          Order Details
          <div style={{ 
            background: isDark ? 'rgba(0,123,255,0.2)' : 'rgba(0,123,255,0.1)',
            borderRadius: 12,
            padding: '4px 10px',
            fontSize: 12,
            fontWeight: 600,
            color: '#007bff'
          }}>
            #{deliverySummary.orderId}
          </div>
        </h3>
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        paddingRight: 4,
        marginRight: -8,
        scrollbarWidth: 'thin',
        scrollbarColor: isDark ? '#3556a3 transparent' : '#007bff transparent',
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(0,0,0,0.12)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Avatar sx={{ 
              width: 42, 
              height: 42, 
              bgcolor: isDark ? '#3556a3' : '#007bff',
              fontSize: 16
            }}>
              {deliverySummary.customer.charAt(0)}
            </Avatar>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{deliverySummary.customer}</div>
              <div style={{ 
                fontSize: 13, 
                color: isDark ? '#bbb' : '#888',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}>
                <PhoneIcon fontSize="inherit" />
                {deliverySummary.customerContact}
              </div>
            </div>
          </div>

          <div style={{ 
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            borderRadius: 8,
            padding: 12,
            marginBottom: 16
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              marginBottom: 6,
              fontSize: 13,
              fontWeight: 500
            }}>
              <LocalShippingIcon fontSize="small" color={isDark ? 'disabled' : 'action'} />
              Delivery Address
            </div>
            <div style={{ fontSize: 13, color: isDark ? '#ddd' : '#555' }}>
              {deliverySummary.deliveryAddress}
            </div>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 16
          }}>
            <div style={{
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              borderRadius: 8,
              padding: 12
            }}>
              <div style={{ fontSize: 12, color: isDark ? '#bbb' : '#888', marginBottom: 4 }}>Order Total</div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{deliverySummary.orderTotal}</div>
            </div>
            <div style={{
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              borderRadius: 8,
              padding: 12
            }}>
              <div style={{ fontSize: 12, color: isDark ? '#bbb' : '#888', marginBottom: 4 }}>Payment Status</div>
              <div style={{ 
                fontWeight: 600, 
                fontSize: 15,
                color: deliverySummary.paymentStatus === 'Paid' ? '#28a745' : '#dc3545',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}>
                {deliverySummary.paymentStatus === 'Paid' ? (
                  <CheckCircleIcon fontSize="inherit" />
                ) : null}
                {deliverySummary.paymentStatus}
              </div>
            </div>
          </div>

          {deliverySummary.specialInstructions && (
            <div style={{ 
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,193,7,0.1)',
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
              border: isDark ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(255,193,7,0.3)'
            }}>
              <div style={{ 
                fontSize: 13,
                fontWeight: 500,
                marginBottom: 6,
                color: isDark ? '#ffc107' : '#ff9800'
              }}>
                Special Instructions
              </div>
              <div style={{ fontSize: 13, color: isDark ? '#ddd' : '#555' }}>
                {deliverySummary.specialInstructions}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 500, marginBottom: 8 }}>Order Items:</div>
            <div style={{ 
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              borderRadius: 8,
              padding: '8px 0'
            }}>
              {deliverySummary.orderDetails.map((item, idx) => (
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

          <div style={{ 
            borderTop: isDark ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(0,0,0,0.1)',
            margin: '16px 0',
            opacity: 0.5
          }}></div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12,
              marginBottom: 12
            }}>
              <Avatar sx={{ 
                width: 42, 
                height: 42, 
                bgcolor: isDark ? '#4a6fca' : '#0056b3',
                fontSize: 16
              }}>
                {deliverySummary.driver.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{deliverySummary.driver.name}</div>
                <div style={{ 
                  fontSize: 13, 
                  color: isDark ? '#bbb' : '#888',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  ⭐ {deliverySummary.driver.rating}
                  <span>•</span>
                  <span style={{ 
                    color: deliverySummary.driver.status === 'available' ? '#28a745' : 
                          deliverySummary.driver.status === 'on delivery' ? '#fd7e14' : '#6c757d'
                  }}>
                    {deliverySummary.driver.status}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 16
            }}>
              <div style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderRadius: 8,
                padding: 12
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12, 
                  color: isDark ? '#bbb' : '#888', 
                  marginBottom: 4 
                }}>
                  <PhoneIcon fontSize="small" />
                  Contact
                </div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{deliverySummary.driver.contact}</div>
              </div>
              <div style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderRadius: 8,
                padding: 12
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12, 
                  color: isDark ? '#bbb' : '#888', 
                  marginBottom: 4 
                }}>
                  <DirectionsBikeIcon fontSize="small" />
                  Vehicle
                </div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{deliverySummary.driver.vehicle} ({deliverySummary.driver.vehicleNo})</div>
              </div>
              <div style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderRadius: 8,
                padding: 12
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12, 
                  color: isDark ? '#bbb' : '#888', 
                  marginBottom: 4 
                }}>
                  <PaymentIcon fontSize="small" />
                  Payment
                </div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{deliverySummary.driver.payment}</div>
              </div>
              <div style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderRadius: 8,
                padding: 12
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12, 
                  color: isDark ? '#bbb' : '#888', 
                  marginBottom: 4 
                }}>
                  <ScheduleIcon fontSize="small" />
                  Shift
                </div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>
                  {deliverySummary.driver.shiftStart} - {deliverySummary.driver.shiftEnd}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Delivery Tracking Section */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ 
              fontWeight: 600, 
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 15
            }}>
              <AccessTimeIcon fontSize="small" />
              Delivery Tracking
            </div>
            
            <div style={{ 
              position: 'relative',
              paddingLeft: 24
            }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute',
                left: 11,
                top: 0,
                bottom: 0,
                width: 2,
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                zIndex: 0
              }}></div>
              
              {trackingSteps.map((step, index) => (
                <motion.div 
                  key={step.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    position: 'relative',
                    marginBottom: index === trackingSteps.length - 1 ? 0 : 16,
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12
                  }}
                >
                  {/* Green marker on the left */}
                  <div style={{
                    position: 'absolute',
                    left: -24,
                    top: 2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: step.completed ? '#28a745' : (isDark ? '#444' : '#ddd'),
                    border: `3px solid ${isDark ? 'rgba(11,36,71,0.7)' : 'rgba(255,255,255,0.9)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {step.completed && (
                      <CheckCircleIcon style={{ 
                        color: '#fff', 
                        fontSize: 14,
                        position: 'absolute'
                      }} />
                    )}
                  </div>
                  
                  {/* Step content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 4
                    }}>
                      <div style={{ 
                        fontWeight: step.completed ? 600 : 500,
                        color: step.completed ? (isDark ? '#fff' : '#222') : (isDark ? '#bbb' : '#888'),
                        fontSize: 14
                      }}>
                        {step.label}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: 12, 
                      color: isDark ? '#777' : '#999',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      {step.time}
                    </div>
                  </div>
                  
                  {/* Icon on the right */}
                  <div style={{
                    color: step.completed ? (isDark ? '#4a6fca' : '#007bff') : (isDark ? '#555' : '#aaa'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                  }}>
                    {React.cloneElement(step.icon, { fontSize: 'small' })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DeliveriesSummary;