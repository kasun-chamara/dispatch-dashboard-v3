import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { fetchOrdersTable } from '../../api/ordersTable';
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
  TextField,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

const OrdersTable = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrdersTable().then(res => {
      setOrders(res.data);
      setFilteredOrders(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

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
          fontSize: '1rem'
        }}>
          Recent Orders
        </Typography>
        
        <SearchField
          placeholder="Search orders..."
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
                padding: '12px 16px'
              }
            }}>
              <TableCell sx={{ flex: 2 }}>ORDER ID</TableCell>
              <TableCell sx={{ flex: 1, textAlign: 'center' }}>STATUS</TableCell>
              <TableCell sx={{ flex: 2 }}>CUSTOMER</TableCell>
              <TableCell sx={{ flex: 1, textAlign: 'center' }}>ITEMS</TableCell>
              <TableCell sx={{ flex: 1, textAlign: 'center' }}>PAYMENT</TableCell>
              <TableCell sx={{ flex: 1, textAlign: 'center' }}>AMOUNT</TableCell>
              <TableCell sx={{ flex: 1, textAlign: 'center' }}>DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow
                  key={order.orderId}
                  hover
                  sx={{ 
                    '&:last-child td': { borderBottom: 0 },
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <TableCell sx={{ flex: 2 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {order.orderId}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ flex: 1, textAlign: 'center' }}>
                    <Tooltip title={getStatusTooltip(order.status)} arrow>
                      <StatusPill status={order.status}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </StatusPill>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ flex: 2 }}>
                    <Typography variant="body2">
                      {order.customer}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ flex: 1, textAlign: 'center' }}>
                    <Chip 
                      label={order.noOfItems} 
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
                  <TableCell sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="body2">
                      {order.payment}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="body2" fontWeight={500}>
                      £{order.amount}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="body2">
                      {order.date}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="textSecondary">
                    No orders found matching your search
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

export default OrdersTable;