import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Typography, useTheme } from '@mui/material';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map view changes
function SetViewOnClick({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

const Map = ({ center = [55.005516859567955, -2.7079445264293915], zoom = 13, markers = [] }) => {
  const theme = useTheme();
  const [position, setPosition] = useState(center);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  
  // Sample markers if none provided
  const defaultMarkers = markers.length > 0 ? markers : [
    {
      position: center,
      title: "Central Location",
      description: "Main office coordinates"
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        '& .leaflet-container': {
          backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
        },
        '& .leaflet-popup-content-wrapper': {
          borderRadius: '12px',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
        },
        '& .leaflet-popup-tip': {
          backgroundColor: theme.palette.background.paper,
        }
      }}
    >
      <MapContainer
        center={position}
        zoom={currentZoom}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        zoomControl={true}
      >
        <SetViewOnClick coords={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={theme.palette.mode === 'dark' ? 
            'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        />
        
        {defaultMarkers.map((marker, index) => (
          <Marker 
            key={index} 
            position={marker.position} 
            icon={customIcon}
            eventHandlers={{
              click: () => {
                setPosition(marker.position);
                setCurrentZoom(16);
              },
            }}
          >
            <Popup>
              <Typography variant="subtitle2" fontWeight="bold">
                {marker.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {marker.description || `Coordinates: ${marker.position[0].toFixed(6)}, ${marker.position[1].toFixed(6)}`}
              </Typography>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <Box sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: theme.palette.background.paper,
        padding: '6px 12px',
        borderRadius: '8px',
        border: `1px solid ${theme.palette.divider}`,
        zIndex: 1000,
      }}>
        <Typography variant="caption">
          Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Map;