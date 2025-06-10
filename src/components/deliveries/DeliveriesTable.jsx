import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { fetchDeliveries } from '../../api/deliveries';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from '@mui/icons-material/Cancel';

// StatusPill component with consistent styling to OrdersTable

// StatusPill component with proper prop handling
const StatusPill = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})(({ theme, status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 10px 4px 8px',
  borderRadius: '12px',
  fontSize: '0.7rem',
  fontWeight: 600,
  minWidth: '90px',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  ...(status === 'En Route' && {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: theme.palette.success.dark,
    border: `1px solid ${theme.palette.success.main}`,
    '&:hover': {
      backgroundColor: 'rgba(76, 175, 80, 0.2)'
    }
  }),
  ...(status === 'Ready' && {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    color: theme.palette.warning.dark,
    border: `1px solid ${theme.palette.warning.main}`,
    '&:hover': {
      backgroundColor: 'rgba(255, 193, 7, 0.2)'
    }
  })
}));

// Keep the same styled components as in OrdersTable for consistency
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: '12px',
  padding: '16px',
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '12px 16px',
    height: '60px'
  }
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '8px 12px',
    fontSize: '0.875rem',
    height: '36px',
    boxSizing: 'border-box'
  }
}));

// Enhanced status icons with consistent sizing
const getStatusIcon = (status) => {
  switch(status) {
    case 'En Route':
      return <DirectionsCarIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case 'Ready':
      return <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />;
    default:
      return <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />;
  }
};


// Enhanced tooltips with more descriptive text
const getStatusTooltip = (status) => {
  switch(status) {
    case 'En Route':
      return 'Order is currently being delivered';
    case 'Ready':
      return 'Order is ready for pickup';
    default:
      return 'Order status unknown';
  }
};

const DeliveriesTable = () => {
  const theme = useTheme();
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDeliveries().then(res => {
      setDeliveries(res.data);
      setFilteredDeliveries(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredDeliveries(deliveries);
    } else {
      const filtered = deliveries.filter(delivery =>
        delivery.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.orderId.toString().includes(searchTerm) ||
        delivery.payment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDeliveries(filtered);
    }
  }, [searchTerm, deliveries]);

  return (
    <StyledTableContainer>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="subtitle1" sx={{ 
          fontWeight: 600,
          fontSize: '1rem',
          color: theme.palette.text.primary
        }}>
          Recent Deliveries
        </Typography>
        
        <SearchField
          placeholder="Search deliveries..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            sx: {
              width: '250px'
            }
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ 
              '& th': {
                fontWeight: 600,
                color: theme.palette.text.secondary,
                fontSize: '0.75rem',
                padding: '12px 16px',
                backgroundColor: theme.palette.background.default
              }
            }}>
              <TableCell>Driver</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="center">Items</TableCell>
              <TableCell align="center">Payment</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDeliveries.length > 0 ? (
              filteredDeliveries.map((delivery) => (
                <TableRow
                  key={delivery.orderId}
                  hover
                  sx={{ 
                    '&:last-child td': { borderBottom: 0 },
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar 
                        sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: theme.palette.primary.main,
                          fontSize: 14,
                          fontWeight: 500
                        }}
                      >
                        {delivery.driverName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {delivery.driverName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {delivery.vehicle}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={getStatusTooltip(delivery.status)} arrow>
                      <StatusPill status={delivery.status}>
                        {getStatusIcon(delivery.status)}
                        {delivery.status}
                      </StatusPill>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={`#${delivery.orderId}`} 
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: '0.7rem',
                        height: '24px',
                        borderColor: theme.palette.primary.light,
                        backgroundColor: `${theme.palette.primary.light}08`
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={500}>
                      {delivery.noOfItems}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: 0.5 
                    }}>
                      <PaymentIcon 
                        fontSize="small" 
                        sx={{
                          color: delivery.payment === 'Paid' ? 
                            theme.palette.success.main : 
                            delivery.payment === 'Pending' ? 
                            theme.palette.warning.main : 
                            theme.palette.error.main,
                          fontSize: '18px'
                        }} 
                      />
                      <Typography variant="body2" fontWeight={500}>
                        {delivery.payment}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={600}>
                      £{delivery.amount}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {delivery.date}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {delivery.time}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="textSecondary">
                    No deliveries found matching your search
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </StyledTableContainer>
  );
};

export default DeliveriesTable;