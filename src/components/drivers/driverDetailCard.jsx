import React, { useEffect, useState } from 'react';
import { fetchDriverDetails } from '../../api/driverDetails';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CircularProgress, 
  Avatar, 
  TextField, 
  InputAdornment,
  IconButton,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PaymentIcon from '@mui/icons-material/Payment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const DriverCard = ({ driver, isDark, onShiftUpdate }) => {
  const [isEditingShift, setIsEditingShift] = useState(false);
  const [shiftInput, setShiftInput] = useState(driver.shiftStart);
  const [endInput, setEndInput] = useState(driver.shiftEnd);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdateShift = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess(true);
      onShiftUpdate(driver.id, shiftInput, endInput);
      setIsEditingShift(false);
      setTimeout(() => setUpdateSuccess(false), 2000);
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
      {updateSuccess && (
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
          Shift updated
        </motion.div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar sx={{ 
            width: 48, 
            height: 48, 
            bgcolor: isDark ? '#3556a3' : '#007bff',
            fontSize: 20,
            fontWeight: 600
          }}>
            {driver.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <div>
            <div style={{ 
              fontWeight: 600,
              fontSize: '1.1rem',
              marginBottom: 2
            }}>
              {driver.name}
            </div>
            <div style={{ 
              fontSize: 12, 
              color: isDark ? '#bbb' : '#888',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              #{driver.id}
            </div>
          </div>
        </div>
        <Chip 
          label={driver.active ? 'Active' : 'Inactive'} 
          size="small"
          color={driver.active ? 'success' : 'error'}
          variant="outlined"
          sx={{ 
            height: 24,
            fontWeight: 500,
            fontSize: '0.7rem'
          }}
        />
      </div>

      <div style={{ 
        borderTop: isDark ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(0,0,0,0.1)',
        margin: '12px 0',
        opacity: 0.5
      }}></div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          marginBottom: 8,
          fontSize: 13
        }}>
          <div style={{ 
            color: isDark ? '#bbb' : '#888',
            minWidth: 100
          }}>
            Contact:
          </div>
          <div style={{ fontWeight: 500 }}>
            {driver.contact}
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: 8,
          marginBottom: 8,
          fontSize: 13
        }}>
          <div style={{ 
            color: isDark ? '#bbb' : '#888',
            minWidth: 100
          }}>
            Address:
          </div>
          <div style={{ fontWeight: 500 }}>
            {driver.address}
          </div>
        </div>
      </div>

      <div style={{ 
        borderTop: isDark ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(0,0,0,0.1)',
        margin: '12px 0',
        opacity: 0.5
      }}></div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          marginBottom: 8,
          fontSize: 13
        }}>
          <LocalShippingIcon fontSize="small" color={isDark ? 'disabled' : 'action'} />
          <div style={{ 
            color: isDark ? '#bbb' : '#888',
            minWidth: 100
          }}>
            Active Orders:
          </div>
          <Chip 
            label={driver.activeOrders} 
            size="small"
            color="primary"
            variant="outlined"
            sx={{ 
              height: 24,
              fontWeight: 500,
              fontSize: '0.7rem'
            }}
          />
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          marginBottom: 8,
          fontSize: 13
        }}>
          <LocalShippingIcon fontSize="small" color={isDark ? 'disabled' : 'action'} />
          <div style={{ 
            color: isDark ? '#bbb' : '#888',
            minWidth: 100
          }}>
            Total Orders:
          </div>
          <div style={{ fontWeight: 500 }}>
            {driver.totalOrders}
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          marginBottom: 8,
          fontSize: 13
        }}>
          <PaymentIcon fontSize="small" color={isDark ? 'disabled' : 'action'} />
          <div style={{ 
            color: isDark ? '#bbb' : '#888',
            minWidth: 100
          }}>
            Payment:
          </div>
          <div style={{ 
            fontWeight: 500,
            color: driver.payment === 'Verified' ? '#28a745' : '#dc3545',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            {driver.payment === 'Verified' ? (
              <CheckCircleIcon fontSize="inherit" />
            ) : (
              <CancelIcon fontSize="inherit" />
            )}
            {driver.payment}
          </div>
        </div>
      </div>

      <div style={{ 
        borderTop: isDark ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(0,0,0,0.1)',
        margin: '12px 0',
        opacity: 0.5
      }}></div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          marginBottom: 8,
          fontSize: 13
        }}>
          <DirectionsCarIcon fontSize="small" color={isDark ? 'disabled' : 'action'} />
          <div style={{ 
            color: isDark ? '#bbb' : '#888',
            minWidth: 100
          }}>
            Vehicle:
          </div>
          <div style={{ fontWeight: 500 }}>
            {driver.vehicle}
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          marginBottom: 8,
          fontSize: 13
        }}>
          <DirectionsCarIcon fontSize="small" color={isDark ? 'disabled' : 'action'} />
          <div style={{ 
            color: isDark ? '#bbb' : '#888',
            minWidth: 100
          }}>
            Vehicle No:
          </div>
          <div style={{ fontWeight: 500 }}>
            {driver.vehicleNo}
          </div>
        </div>
      </div>

      <div style={{ 
        borderTop: isDark ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(0,0,0,0.1)',
        margin: '12px 0',
        opacity: 0.5
      }}></div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: 8
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            fontSize: 13
          }}>
            <ScheduleIcon fontSize="small" color={isDark ? 'disabled' : 'action'} />
            <div style={{ 
              color: isDark ? '#bbb' : '#888',
              minWidth: 100
            }}>
              Shift Times:
            </div>
          </div>
          <IconButton 
            size="small" 
            onClick={() => setIsEditingShift(!isEditingShift)}
            sx={{
              color: isDark ? '#bbb' : '#888',
              '&:hover': {
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
              }
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </div>

        {!isEditingShift ? (
          <>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              marginBottom: 8,
              fontSize: 13,
              paddingLeft: 32
            }}>
              <div style={{ 
                color: isDark ? '#bbb' : '#888',
                minWidth: 80
              }}>
                Start:
              </div>
              <div style={{ fontWeight: 500 }}>
                {driver.shiftStart}
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              fontSize: 13,
              paddingLeft: 32
            }}>
              <div style={{ 
                color: isDark ? '#bbb' : '#888',
                minWidth: 80
              }}>
                End:
              </div>
              <div style={{ fontWeight: 500 }}>
                {driver.shiftEnd}
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              marginBottom: 8,
              fontSize: 13,
              paddingLeft: 32
            }}>
              <div style={{ 
                color: isDark ? '#bbb' : '#888',
                minWidth: 80
              }}>
                Start:
              </div>
              <TextField
                value={shiftInput}
                onChange={(e) => setShiftInput(e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: 13,
                    height: 32
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '8px 12px'
                  },
                  backgroundColor: isDark ? 'rgba(11,36,71,0.7)' : '#fff',
                }}
              />
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              marginBottom: 12,
              fontSize: 13,
              paddingLeft: 32
            }}>
              <div style={{ 
                color: isDark ? '#bbb' : '#888',
                minWidth: 80
              }}>
                End:
              </div>
              <TextField
                value={endInput}
                onChange={(e) => setEndInput(e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: 13,
                    height: 32
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '8px 12px'
                  },
                  backgroundColor: isDark ? 'rgba(11,36,71,0.7)' : '#fff',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <motion.button
                onClick={() => setIsEditingShift(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  background: 'transparent',
                  color: isDark ? '#bbb' : '#888',
                  border: isDark ? '1px solid #3556a3' : '1px solid #ccc',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  minWidth: 80
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleUpdateShift}
                disabled={isUpdating}
                whileHover={{ scale: isUpdating ? 1 : 1.03 }}
                whileTap={{ scale: isUpdating ? 1 : 0.98 }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  background: isUpdating ? 'rgba(0,123,255,0.7)' : '#007bff',
                  color: '#fff',
                  border: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: isUpdating ? 'not-allowed' : 'pointer',
                  minWidth: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                {isUpdating ? (
                  <>
                    <CircularProgress size={14} thickness={5} sx={{ color: '#fff' }} />
                    Saving...
                  </>
                ) : 'Save'}
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const DriverDetailsRequests = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDriverDetails().then(res => {
        setDrivers(res.data);
        setLoading(false);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleShiftUpdate = (driverId, newStart, newEnd) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === driverId 
          ? { ...driver, shiftStart: newStart, shiftEnd: newEnd } 
          : driver
      )
    );
    console.log(`Updated shift for driver ${driverId}: ${newStart} - ${newEnd}`);
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.id.toString().includes(searchTerm)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: 352,
        width: '100%',
        flex: '0 0 352px',
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
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: 16
        }}>
          <h3 style={{ 
            margin: 0, 
            color: isDark ? '#fff' : '#222',
            fontSize: 20,
            fontWeight: 600
          }}>
            Driver Details
          </h3>
          <div style={{ 
            background: isDark ? 'rgba(0,123,255,0.2)' : 'rgba(0,123,255,0.1)',
            borderRadius: 12,
            padding: '4px 10px',
            fontSize: 12,
            fontWeight: 600,
            color: '#007bff'
          }}>
            {drivers.length} {drivers.length === 1 ? 'Driver' : 'Drivers'}
          </div>
        </div>

        <TextField
          placeholder="Search drivers..."
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
              borderRadius: 3,
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
            <div style={{ fontSize: 14 }}>Loading drivers...</div>
          </div>
        ) : filteredDrivers.length === 0 ? (
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
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>No drivers found</div>
            <div style={{ fontSize: 13 }}>{searchTerm ? 'Try a different search term' : 'No drivers available'}</div>
          </div>
        ) : (
          <AnimatePresence>
            {filteredDrivers.map((driver) => (
              <DriverCard 
                key={driver.id} 
                driver={driver} 
                isDark={isDark} 
                onShiftUpdate={handleShiftUpdate}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default DriverDetailsRequests;