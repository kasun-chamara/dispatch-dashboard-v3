import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import SideNavBar from './Sidebar';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children, onToggleTheme }) => {
  const location = useLocation();
  const [mini, setMini] = useState(false);

  const handleToggleMini = () => setMini((prev) => !prev);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNavBar mini={mini} isMobile={false} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Header
          onMenuClick={handleToggleMini}
          isMobile={false}
          mini={mini}
          location={location}
          onToggleTheme={onToggleTheme}
        />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;