// OrdersTable.jsx
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ablyClient from "../../ably/ablyClient";
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
  TextField,
  InputAdornment,
  Tooltip,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FlagIcon from "@mui/icons-material/Flag";
import ErrorIcon from "@mui/icons-material/Error";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const statusColors = {
  CREATED: { bg: "#e3f2fd", color: "#1976d2" },
  ASSIGNED: { bg: "#ede7f6", color: "#673ab7" },
  ACCEPTED: { bg: "#e0f7fa", color: "#00796b" },
  PICKED_UP: { bg: "#e0f2f1", color: "#00695c" },
  EN_ROUTE: { bg: "#fff8e1", color: "#f57c00" },
  ARRIVED_AT_DELIVERY: { bg: "#fff3e0", color: "#ef6c00" },
  DELIVERED: { bg: "#e8f5e9", color: "#388e3c" },
  REJECTED: { bg: "#ffebee", color: "#d32f2f" },
  FAILED: { bg: "#fbe9e7", color: "#e64a19" },
};

const StatusPill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status }) => {
  const { bg, color } = statusColors[status] || {
    bg: "#eeeeee",
    color: "#616161",
  };
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 10px 4px 8px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: 600,
    width: "120px",
    backgroundColor: bg,
    color: color,
    border: `1px solid ${color}`,
    transition: "all 0.2s ease",
  };
});

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "12px",
  padding: "16px",
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "12px 16px",
    height: "60px",
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: theme.palette.background.paper,
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "8px 12px",
    fontSize: "0.875rem",
    height: "36px",
    boxSizing: "border-box",
  },
}));

const getStatusIcon = (status) => {
  switch (status) {
    case "CREATED": return <AssignmentIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case "ASSIGNED": return <DoneAllIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case "ACCEPTED": return <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case "REJECTED": return <CancelIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case "PICKED_UP": return <LocalShippingIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case "EN_ROUTE": return <DirectionsCarIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case "ARRIVED_AT_DELIVERY": return <FlagIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case "DELIVERED": return <TaskAltIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case "FAILED": return <ErrorIcon fontSize="small" sx={{ mr: 0.5 }} />;
    default: return <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />;
  }
};

const getStatusTooltip = (status) => {
  const map = {
    CREATED: "Order has been created",
    ASSIGNED: "Order has been assigned",
    ACCEPTED: "Order was accepted",
    REJECTED: "Order was rejected",
    PICKED_UP: "Order picked up by driver",
    EN_ROUTE: "Order is on the way",
    ARRIVED_AT_DELIVERY: "Driver arrived at destination",
    DELIVERED: "Order delivered successfully",
    FAILED: "Order delivery failed",
  };
  return map[status] || "Order status unknown";
};

const OrdersTable = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://13.41.192.8:3000/v1/orders/location/36726661/list?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.data.map((o) => ({
          orderId: o.orderId,
          orderNumber: o.orderNumber,
          customer: o.customer?.name || "N/A",
          status: o.orderStatus,
          noOfItems: o.orderItems?.length ?? 0,
          payment: o.paymentMethod || "Unknown",
          amount: o.costing?.totalCost || 0,
          date: new Date(o.placementTime).toLocaleDateString(),
        }));
        setOrders(transformed);
        setFilteredOrders(transformed);
        setLoading(false);
      });

    const channel = ablyClient.channels.get("order-36726661");
    const handleUpdate = (msg) => {
      const raw = msg?.data?.message;
      if (!raw?.orderId) return;
      const updatedOrderId = raw.orderId;
      const updatedStatus = raw.orderStatus;
      setOrders((prev) => prev.map((o) => (o.orderId === updatedOrderId ? { ...o, status: updatedStatus } : o)));
      setFilteredOrders((prev) => prev.map((o) => (o.orderId === updatedOrderId ? { ...o, status: updatedStatus } : o)));
    };
    channel.subscribe("ORDER_STATUS_UPDATED", handleUpdate);
    return () => channel.unsubscribe("ORDER_STATUS_UPDATED", handleUpdate);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredOrders(orders);
      setSuggestions([]);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
      setSuggestions(filtered.slice(0, 5));
    }
  }, [searchTerm, orders]);

  return (
    <StyledTableContainer>
      <Box mb={2} position="relative">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Recent Orders</Typography>
          <Box sx={{ width: "250px" }}>
            <SearchField
              placeholder="Search orders..."
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
              }}
            />
            {suggestions.length > 0 && (
              <Paper elevation={3} sx={{ position: "absolute", zIndex: 2, mt: 1, width: "250px", borderRadius: "8px" }}>
                <List dense>
                  {suggestions.map((sugg) => (
                    <ListItem key={sugg.orderId} button onClick={() => setSearchTerm(sugg.orderNumber)}>
                      <ListItemText
                        primary={`${sugg.orderNumber} — ${sugg.customer}`}
                        secondary={`Order ID: ${sugg.orderId}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ORDER NUMBER</TableCell>
              <TableCell align="center">STATUS</TableCell>
              <TableCell>CUSTOMER</TableCell>
              <TableCell align="center">ITEMS</TableCell>
              <TableCell align="center">PAYMENT</TableCell>
              <TableCell align="center">AMOUNT</TableCell>
              <TableCell align="center">DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.orderId} hover>
                  <TableCell><Typography variant="body2" fontWeight={500}>{order.orderNumber}</Typography></TableCell>
                  <TableCell align="center">
                    <Tooltip title={getStatusTooltip(order.status)} arrow>
                      <StatusPill status={order.status}>{getStatusIcon(order.status)} {order.status}</StatusPill>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 24, height: 24 }}>{order.customer?.charAt(0)}</Avatar>
                      <Typography variant="body2">{order.customer}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={order.noOfItems} color="primary" variant="outlined" size="small" />
                  </TableCell>
                  <TableCell align="center"><Typography variant="body2">{order.payment}</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body2" fontWeight={500}>£{order.amount.toFixed(2)}</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body2">{order.date}</Typography></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="textSecondary">No orders found matching your search</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </StyledTableContainer>
  );
};

export default OrdersTable;
