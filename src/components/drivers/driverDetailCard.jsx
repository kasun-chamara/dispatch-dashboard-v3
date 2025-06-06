import React, { useEffect, useState } from 'react';
import { fetchDriverDetails } from '../../api/driverDetails';
import { useTheme } from '@mui/material/styles';

const DriverDetailsCard = ({ driver, isDark }) => {
  const [shiftInput, setShiftInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const isActive = driver.active;

  return (
    <div
      style={{
        border: isDark ? '1px solid #233e7c' : '1px solid #eee',
        borderRadius: 10,
        padding: 16,
        marginBottom: 14,
        background: isDark ? 'rgba(11,36,71,0.7)' : '#F8F4EB',
        fontSize: 13,
        maxWidth: 320,
        width: '100%',
        boxSizing: 'border-box',
        color: isDark ? '#fff' : '#222',
        boxShadow: isDark
          ? '0 4px 32px 0 rgba(11,36,71,0.25)'
          : '0 4px 32px 0 rgba(0,0,0,0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background 0.3s, color 0.3s, border 0.3s'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontWeight: 600 }}>
          Name: <span style={{ color: '#007bff' }}>{driver.name}</span>
        </span>
        <span style={{ flex: 1 }} />
        <span
          title={isActive ? 'Active' : 'Inactive'}
          style={{
            display: 'inline-block',
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: isActive ? '#28a745' : '#dc3545',
            marginLeft: 8,
            border: '2px solid #fff',
            boxShadow: '0 0 0 1px #bbb',
          }}
        ></span>
      </div>
      <div style={{ marginBottom: 4 }}>
        <b>Contact:</b> {driver.contact}
      </div>
      <div style={{ marginBottom: 4 }}>
        <b>Address:</b> {driver.address}
      </div>
      <div
        style={{
          borderTop: isDark ? '1px dashed #3556a3' : '1px dashed #bbb',
          margin: '10px 0'
        }}
      ></div>
      <div style={{ marginBottom: 4 }}>
        <b>Active Orders:</b> {driver.activeOrders}
      </div>
      <div style={{ marginBottom: 4 }}>
        <b>Total Orders:</b> {driver.totalOrders}
      </div>
      <div style={{ marginBottom: 4 }}>
        <b>Payment:</b> {driver.payment}
      </div>
      <div style={{ marginBottom: 4 }}>
        <b>Vehicle:</b> {driver.vehicle}
      </div>
      <div style={{ marginBottom: 4 }}>
        <b>Vehicle No:</b> {driver.vehicleNo}
      </div>
      <div
        style={{
          borderTop: isDark ? '1px dashed #3556a3' : '1px dashed #bbb',
          margin: '10px 0'
        }}
      ></div>
      <div style={{ marginBottom: 4 }}>
        <b>Shift Start at:</b> {driver.shiftStart}
      </div>
      <div style={{ marginBottom: 4 }}>
        <b>Shift End at:</b> {driver.shiftEnd}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
        <input
          type="text"
          placeholder="Shift Start time"
          value={shiftInput}
          onChange={e => setShiftInput(e.target.value)}
          style={{
            flex: 1,
            padding: '5px 8px',
            borderRadius: 4,
            border: isDark ? '1px solid #3556a3' : '1px solid #bbb',
            fontSize: 13,
            background: isDark ? 'rgba(11,36,71,0.7)' : '#fff',
            color: isDark ? '#fff' : '#222'
          }}
        />
        <button
          style={{
            marginLeft: 5,
            minWidth: 60,
            padding: '5px 0',
            borderRadius: 5,
            background: '#007bff',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer'
          }}
        >
          Start
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
        <input
          type="text"
          placeholder="Shift End time"
          value={endInput}
          onChange={e => setEndInput(e.target.value)}
          style={{
            flex: 1,
            padding: '5px 8px',
            borderRadius: 4,
            border: isDark ? '1px solid #3556a3' : '1px solid #bbb',
            fontSize: 13,
            background: isDark ? 'rgba(11,36,71,0.7)' : '#fff',
            color: isDark ? '#fff' : '#222'
          }}
        />
        <button
          style={{
            marginLeft: 5,
            minWidth: 60,
            padding: '5px 0',
            borderRadius: 5,
            background: '#007bff',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer'
          }}
        >
          End
        </button>
      </div>
    </div>
  );
};

const DriverDetailsRequests = () => {
  const [search, setSearch] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    fetchDriverDetails().then(res => {
      setDrivers(res.data);
      setLoading(false);
    });
  }, []);

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 320,
        minHeight: 575,
        background: isDark ? 'rgba(11,36,71,0.55)' : '#fff',
        borderRadius: 10,
        padding: 16,
        flex: '0 0 320px',
        display: 'flex',
        flexDirection: 'column',
        marginRight: 0,
        marginTop: 0,
        boxShadow: isDark
          ? '0 4px 32px 0 rgba(11,36,71,0.25)'
          : '0 4px 32px 0 rgba(0,0,0,0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid #eee',
        transition: 'background 0.3s, color 0.3s, border 0.3s'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10, marginTop: 0 }}>
        <h6 className="mb-0" style={{ flex: 1, color: isDark ? '#fff' : '#222' }}>Driver Details</h6>
        <div style={{ position: 'relative', width: 150 }}>
          <span
            style={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: isDark ? '#bbb' : '#888',
              pointerEvents: 'none',
              zIndex: 2
            }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 18 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by driver"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              fontSize: 14,
              padding: '6px 8px 6px 32px',
              borderRadius: 7,
              border: isDark ? '1px solid #3556a3' : '1px solid #ccc',
              background: isDark ? 'rgba(11,36,71,0.7)' : '#fff',
              color: isDark ? '#fff' : '#222',
              transition: 'background 0.3s, color 0.3s, border 0.3s'
            }}
          />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {loading ? (
          <div style={{ color: isDark ? '#bbb' : '#888', textAlign: 'center', marginTop: 32 }}>
            Loading...
          </div>
        ) : (
          <>
            {filteredDrivers.map((driver, idx) => (
              <DriverDetailsCard key={idx} driver={driver} isDark={isDark} />
            ))}
            {filteredDrivers.length === 0 && (
              <div style={{ color: isDark ? '#bbb' : '#888', textAlign: 'center', marginTop: 32 }}>
                No drivers found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DriverDetailsRequests;