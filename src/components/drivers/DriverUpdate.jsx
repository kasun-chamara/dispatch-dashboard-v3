import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  InputAdornment,
  CircularProgress,
  Typography,
  Chip,
  Divider
} from '@mui/material';
import {
  DriveEta as DriveEtaIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Palette as PaletteIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '12px',
    border: `1px solid ${theme.palette.divider}`,
    width: '100%',
    maxWidth: '500px',
    overflow: 'hidden'
  }
}));

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: '16px 24px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
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
    padding: '12px 14px',
    fontSize: '0.875rem'
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px 16px',
  fontSize: '0.875rem',
  textTransform: 'none',
  fontWeight: 500,
  '&.MuiButton-contained': {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    }
  }
}));

const ColorPreview = styled(Box)(({ color }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '4px',
  backgroundColor: color,
  border: '1px solid rgba(0, 0, 0, 0.1)',
  cursor: 'pointer'
}));

const DriverUpdate = ({ open, onClose, driver, onUpdate }) => {
  const theme = useTheme();
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    vehicleModel: '',
    colorCode: theme.palette.primary.main
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (driver) {
      setForm({
        name: driver.name || '',
        phoneNumber: driver.phoneNumber || '',
        email: driver.email || '',
        vehicleModel: driver.vehicleModel || '',
        colorCode: driver.colorCode || theme.palette.primary.main
      });
    }
    setErrors({});
  }, [driver, open, theme.palette.primary.main]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleUpdate = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await onUpdate(form);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledDialog open={open} onClose={isSubmitting ? null : onClose}>
      <DialogHeader>
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            width: 32,
            height: 32,
          }}
        >
          <SettingsIcon fontSize="small" />
        </Avatar>
        <Typography variant="subtitle1" fontWeight={600}>
          Update Driver Details
        </Typography>
      </DialogHeader>

      <DialogContent sx={{ py: 3, px: 3 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={driver?.avatar}
              sx={{
                width: 56,
                height: 56,
                marginTop: 3,
                backgroundColor: form.colorCode,
                color: theme.palette.getContrastText(form.colorCode),
              }}
            >
              {driver?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>
                Driver ID: #{driver?.id || "--"}
              </Typography>
              <Chip
                label={driver?.status || "Unknown"}
                size="small"
                sx={{
                  mt: 0.5,
                  backgroundColor:
                    driver?.status === "En Route"
                      ? "rgba(76, 175, 80, 0.1)"
                      : driver?.status === "Ready"
                      ? "rgba(255, 193, 7, 0.1)"
                      : "rgba(158, 158, 158, 0.1)",
                  color:
                    driver?.status === "En Route"
                      ? theme.palette.success.dark
                      : driver?.status === "Ready"
                      ? theme.palette.warning.dark
                      : theme.palette.text.secondary,
                  border: `1px solid ${
                    driver?.status === "En Route"
                      ? theme.palette.success.main
                      : driver?.status === "Ready"
                      ? theme.palette.warning.main
                      : theme.palette.text.secondary
                  }`,
                  fontSize: "0.7rem",
                  height: "24px",
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <StyledTextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            label="Phone Number"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            label="Vehicle Model"
            name="vehicleModel"
            value={form.vehicleModel}
            onChange={handleChange}
            fullWidth
            error={!!errors.vehicleModel}
            helperText={errors.vehicleModel}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DriveEtaIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" alignItems="center" gap={2}>
            <PaletteIcon fontSize="small" color="action" />
            <Typography variant="body2" color="textSecondary">
              Vehicle Color
            </Typography>
            <Box flexGrow={1} />
            <ColorPreview color={form.colorCode} />
            <input
              type="color"
              name="colorCode"
              value={form.colorCode}
              onChange={handleChange}
              style={{
                width: "24px",
                height: "24px",
                border: "none",
                background: "none",
                cursor: "pointer",
                opacity: 0,
                position: "absolute",
              }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}
      >
        <ActionButton
          onClick={onClose}
          color="secondary"
          variant="outlined"
          disabled={isSubmitting}
          sx={{ mr: 2 }}
        >
          Cancel
        </ActionButton>
        <ActionButton
          onClick={handleUpdate}
          color="primary"
          variant="contained"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          {isSubmitting ? "Updating..." : "Update Driver"}
        </ActionButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default DriverUpdate;