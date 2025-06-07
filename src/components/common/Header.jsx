import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

// Page metadata map for icon + title
const pageMeta = {
  '/dashboard': { 
    icon: <DashboardOutlinedIcon sx={{ mr: 1 }} />, 
    name: 'Dashboard'
  },
  '/drivers': { 
    icon: <SportsMotorsportsOutlinedIcon sx={{ mr: 1 }} />, 
    name: 'Drivers'
  },
  '/deliveries': { 
    icon: <DirectionsBikeIcon sx={{ mr: 1 }} />, 
    name: 'Deliveries'
  },
  '/orders': { 
    icon: <ReceiptOutlinedIcon sx={{ mr: 1 }} />, 
    name: 'Orders'
  },
};

const Header = ({ onMenuClick, isMobile, mini, location, onToggleTheme }) => {
  const theme = useTheme();
  const meta = pageMeta[location.pathname] || { icon: null, name: '' };

  // Static colors that won't change
  const staticColors = {
    icon: theme.palette.mode === 'dark' ? '#ffffff' : '#555555',
    text: theme.palette.mode === 'dark' ? '#ffffff' : '#222222',
    menuButton: theme.palette.mode === 'dark' ? '#ffffff' : '#555555',
    themeButton: theme.palette.mode === 'dark' ? '#ffca28' : '#555555'
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#1e2026' : '#f4f5f7',
        color: staticColors.text,
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: 'none',
        borderBottom: theme.palette.mode === 'dark' 
          ? '1px solid rgba(255,255,255,0.08)' 
          : '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Toolbar sx={{ 
        minHeight: 64,
        paddingLeft: isMobile ? 2 : 3,
        paddingRight: isMobile ? 2 : 3,
      }}>
        <Tooltip title={mini ? "Expand menu" : "Collapse menu"}>
          <IconButton
            onClick={onMenuClick}
            sx={{ 
              mr: 2,
              color: staticColors.menuButton,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.08)' 
                  : 'rgba(0,0,0,0.04)'
              }
            }}
          >
            {mini ? <MenuOutlinedIcon /> : <ArrowBackIosNewOutlinedIcon />}
          </IconButton>
        </Tooltip>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          flexGrow: 1,
        }}>
          {meta.icon && React.cloneElement(meta.icon, { 
            sx: { 
              ...meta.icon.props.sx, 
              color: staticColors.icon 
            } 
          })}
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              color: staticColors.text,
            }}
          >
            {meta.name}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: isMobile ? 1 : 2,
        }}>
          <Tooltip title="Toggle theme">
            <IconButton
              onClick={onToggleTheme}
              sx={{
                color: staticColors.themeButton,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255,202,40,0.1)' 
                    : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              <Brightness6Icon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton
              sx={{
                color: staticColors.icon,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>

          {!isMobile && (
            <Typography 
              variant="subtitle1" 
              component="div" 
              sx={{ 
                fontWeight: 600,
                ml: 1,
                color: staticColors.text,
              }}
            >
              Company Name
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;