import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainLayout from './components/common/MainLayout';
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';
import Deliveries from './pages/Deliveries';
import Orders from './pages/Orders'; 
import './services/mockService';

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const handleToggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout onToggleTheme={handleToggleTheme}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/orders" element={<Orders />} /> 
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;