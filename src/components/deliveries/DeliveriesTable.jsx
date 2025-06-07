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
  Button,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';

const StatusPill = styled(Box)(({ theme, status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 600,
  width: '100px',
  justifyContent: 'center',
  ...(status === 'Delivered' && {
    backgroundColor: 'rgba(82, 196, 26, 0.1)',
    color: theme.palette.success.dark,
    border: `1px solid ${theme.palette.success.main}`
  }),
  ...(status === 'Pending' && {
    backgroundColor: 'rgba(255, 197, 7, 0.1)',
    color: theme.palette.warning.dark,
    border: `1px solid ${theme.palette.warning.main}`
  }),
  ...(status === 'Cancelled' && {
    backgroundColor: 'rgba(255, 86, 48, 0.1)',
    color: theme.palette.error.dark,
    border: `1px solid ${theme.palette.error.main}`
  }),
  ...(status === 'In Progress' && {
    backgroundColor: 'rgba(24, 144, 255, 0.1)',
    color: theme.palette.info.dark,
    border: `1px solid ${theme.palette.info.main}`
  })
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: '12px',
  padding: '16px',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 4px 32px 0 rgba(11,36,71,0.25)' 
    : '0 4px 32px 0 rgba(0,0,0,0.08)',
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
    padding: '10px 14px',
    fontSize: '0.875rem',
    height: '40px',
    boxSizing: 'border-box'
  }
}));

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
        delivery.payment.toLowerCase().includes(searchTerm.toLowerCase())
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
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
        
          Deliveries
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
              width: '280px'
            }
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: theme.palette.primary.main,
                          fontSize: 14
                        }}
                      >
                        {delivery.driverName.charAt(0)}
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
                    <StatusPill status={delivery.status}>
                      {delivery.status === 'Delivered' && (
                        <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
                      )}
                      {delivery.status === 'Pending' && (
                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                      )}
                      {delivery.status === 'In Progress' && (
                        <LocalShippingIcon fontSize="small" sx={{ mr: 0.5 }} />
                      )}
                      {delivery.status}
                    </StatusPill>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={`#${delivery.orderId}`} 
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        height: '24px'
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={500}>
                      {delivery.noOfItems}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <PaymentIcon fontSize="small" color={
                        delivery.payment === 'Paid' ? 'success' : 
                        delivery.payment === 'Pending' ? 'warning' : 'error'
                      } />
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