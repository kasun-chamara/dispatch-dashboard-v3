import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { useTheme } from '@mui/material/styles';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
  { text: 'Deliveries', icon: <DirectionsBikeIcon />, path: '/deliveries' },
  { text: 'Drivers', icon: <SportsMotorsportsOutlinedIcon />, path: '/drivers' },
  { text: 'Orders', icon: <ReceiptOutlinedIcon />, path: '/orders' },
];

const SideNavBar = ({ width = 240, open = true, mini = false, isMobile = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const drawerProps = isMobile
    ? {
        variant: 'temporary',
        open,
        onClose,
        ModalProps: { keepMounted: true },
      }
    : {
        variant: 'permanent',
        open: true,
      };

  return (
    <Drawer
      anchor="left"
      sx={{
        width: mini ? 80 : width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: mini ? 80 : width,
          boxSizing: 'border-box',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(195deg, #1e2026, #1a1c22)' 
            : 'linear-gradient(195deg, #ffffff, #fafafa)',
          color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#5a5a5a',
          top: 64,
          height: 'calc(100% - 64px)',
          overflowX: 'hidden',
          transition: theme.transitions.create(['width', 'background'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          borderRight: 'none',
          boxShadow: theme.shadows[1],
          marginRight: '16px',
          '&:hover': {
            boxShadow: theme.shadows[3],
          },
        },
      }}
      {...drawerProps}
    >
      <List sx={{ 
        px: 1,
        '& .MuiListItem-root': {
          marginRight: '8px',
        }
      }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Tooltip 
              title={mini ? item.text : ''} 
              placement="right" 
              key={item.text}
              arrow
            >
              <ListItem
                button
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '0 20px 20px 0',
                  justifyContent: mini ? 'center' : 'flex-start',
                  px: mini ? 0 : 2.5,
                  py: 1.25,
                  my: 0.5,
                  marginLeft: '8px',
                  marginRight: '8px',
                  background: isActive
                    ? theme.palette.mode === 'dark'
                      ? 'rgba(25, 55, 109, 0.7)'
                      : 'rgba(227, 232, 255, 0.7)'
                    : 'transparent',
                  color: isActive
                    ? theme.palette.mode === 'dark'
                      ? '#ffffff'
                      : theme.palette.primary.main
                    : 'inherit',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: isActive ? '4px' : '0px',
                    background: theme.palette.primary.main,
                    borderRadius: '0 4px 4px 0',
                    transition: theme.transitions.create('width', {
                      duration: theme.transitions.duration.short,
                    }),
                  },
                  '&:hover': {
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(35, 62, 124, 0.5)' 
                      : 'rgba(244, 245, 247, 0.7)',
                    color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                    '&::before': {
                      width: '4px',
                    }
                  },
                  transition: theme.transitions.create(
                    ['background', 'transform', 'box-shadow'], 
                    {
                      duration: theme.transitions.duration.short,
                    }
                  ),
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: mini ? 0 : 2,
                    justifyContent: 'center',
                    color: 'inherit',
                    fontSize: '1.25rem',
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { 
                      fontSize: '1.25rem',
                      transition: theme.transitions.create('transform', {
                        duration: theme.transitions.duration.short,
                      }),
                    }
                  })}
                </ListItemIcon>
                {!mini && (
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.875rem',
                      transition: theme.transitions.create('all', {
                        duration: theme.transitions.duration.short,
                      }),
                    }} 
                  />
                )}
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideNavBar;