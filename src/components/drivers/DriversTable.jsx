import React, { useEffect, useState } from 'react';
import { fetchDrivers } from '../../api/drivers';
import { useTheme } from '@mui/material/styles';
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
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

const StatusPill = styled(Box)(({ theme, status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '0.7rem',
  fontWeight: 600,
  width: '80px', // Fixed width for alignment
  justifyContent: 'center',
  ...(status === 'En Route' && {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: theme.palette.success.dark,
    border: `1px solid ${theme.palette.success.main}`
  }),
  ...(status === 'Ready' && {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    color: theme.palette.warning.dark,
    border: `1px solid ${theme.palette.warning.main}`
  }),
  ...(status === 'Offline' && {
    backgroundColor: 'rgba(158, 158, 158, 0.1)',
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.text.secondary}`
  })
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: '12px',
  padding: '16px',
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '8px 12px',
    height: '48px' // Reduced row height
  }
}));

const AssignButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '6px',
  padding: '4px 12px',
  fontSize: '0.75rem',
  textTransform: 'none',
  fontWeight: 500,
  minWidth: '70px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const DriversTable = () => {
  const theme = useTheme();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers().then(res => {
      setDrivers(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <StyledTableContainer>
      <Typography variant="subtitle1" sx={{ 
        fontWeight: 600,
        mb: 2,
        fontSize: '1rem'
      }}>
        Active Drivers
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow sx={{ 
              '& th': {
                fontWeight: 600,
                color: theme.palette.text.secondary,
                fontSize: '0.75rem',
                padding: '8px 12px'
              }
            }}>
              <TableCell>Driver</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell>Shift End</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow
                key={driver.id}
                hover
                sx={{ 
                  '&:last-child td': { borderBottom: 0 },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={driver.avatar} 
                      alt={driver.name}
                      sx={{ width: 32, height: 32, mr: 1.5 }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {driver.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        #{driver.id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <StatusPill status={driver.status}>
                    {driver.status}
                  </StatusPill>
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={driver.activeOrders} 
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ 
                      fontWeight: 500,
                      fontSize: '0.7rem',
                      height: '24px'
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" fontWeight={500}>
                    {driver.totalOrders}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {driver.shiftEnd}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {driver.shiftTimeRemaining}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <AssignButton size="small">
                      Assign
                    </AssignButton>
                    <IconButton size="small" aria-label="settings">
                      <SettingsIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </StyledTableContainer>
  );
};

export default DriversTable;