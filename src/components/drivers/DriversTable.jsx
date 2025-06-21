import React, { useEffect, useState } from 'react';
import { fetchDrivers } from '../../api/drivers';
import { useTheme } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, CircularProgress, Box, Chip, Avatar, Button, IconButton,
  TextField, InputAdornment, Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DriverUpdate from './DriverUpdate'; // ✅ Make sure the path is correct

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
    height: '48px'
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

const DriversTable = () => {
  const theme = useTheme();
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    fetchDrivers().then(res => {
      setDrivers(res.data);
      setFilteredDrivers(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredDrivers(drivers);
    } else {
      const filtered = drivers.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.id.toString().includes(searchTerm)
      );
      setFilteredDrivers(filtered);
    }
  }, [searchTerm, drivers]);

  const handleDriverUpdate = (updatedData) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === selectedDriver.id ? { ...d, ...updatedData } : d))
    );
    setFilteredDrivers((prev) =>
      prev.map((d) => (d.id === selectedDriver.id ? { ...d, ...updatedData } : d))
    );
    setOpenDialog(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'En Route': return <DirectionsCarIcon fontSize="small" sx={{ mr: 0.5 }} />;
      case 'Ready': return <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />;
      case 'Offline': return <PowerSettingsNewIcon fontSize="small" sx={{ mr: 0.5 }} />;
      default: return <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />;
    }
  };

  const getStatusTooltip = (status) => {
    switch (status) {
      case 'En Route': return 'Driver is currently on a delivery';
      case 'Ready': return 'Driver is available for assignments';
      case 'Offline': return 'Driver is not currently available';
      default: return 'Driver status unknown';
    }
  };

  return (
    <StyledTableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
          Active Drivers
        </Typography>
        <SearchField
          placeholder="Search drivers..."
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
            sx: { width: '250px' }
          }}
        />
      </Box>

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
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver) => (
                <TableRow key={driver.id} hover sx={{
                  '&:last-child td': { borderBottom: 0 },
                  '&:hover': { backgroundColor: theme.palette.action.hover }
                }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={driver.avatar} alt={driver.name} sx={{ width: 36, height: 36, mr: 1.5 }} />
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {driver.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          #{driver.id} • {driver.vehicle}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={getStatusTooltip(driver.status)} arrow>
                      <StatusPill status={driver.status}>
                        {getStatusIcon(driver.status)}
                        {driver.status}
                      </StatusPill>
                    </Tooltip>
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
                        height: '24px',
                        borderColor: theme.palette.primary.light,
                        backgroundColor: `${theme.palette.primary.light}08`
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={500}>
                      {driver.totalOrders}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" color="disabled" />
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {driver.shiftEnd}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {driver.shiftTimeRemaining}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <AssignButton
                        size="small"
                        startIcon={<DirectionsCarIcon fontSize="small" />}
                      >
                        Assign
                      </AssignButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedDriver(driver);
                          setOpenDialog(true);
                        }}
                        aria-label="settings"
                        sx={{
                          border: `1px solid ${theme.palette.divider}`,
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover
                          }
                        }}
                      >
                        <SettingsIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="textSecondary">
                    No drivers found matching your search
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* ✅ Driver Update Dialog */}
      <DriverUpdate
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        driver={selectedDriver}
        onUpdate={handleDriverUpdate}
      />
    </StyledTableContainer>
  );
};

export default DriversTable;
