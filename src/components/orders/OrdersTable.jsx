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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StatusPill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ theme, status }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 10px 4px 8px",
  borderRadius: "12px",
  fontSize: "0.7rem",
  fontWeight: 600,
  minWidth: "90px",
  justifyContent: "center",
  transition: "all 0.2s ease",
  ...(status === "En Route" && {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    color: theme.palette.success.dark,
    border: `1px solid ${theme.palette.success.main}`,
    "&:hover": {
      backgroundColor: "rgba(76, 175, 80, 0.2)",
    },
  }),
  ...(status === "Ready" && {
    backgroundColor: "rgba(255, 193, 7, 0.1)",
    color: theme.palette.warning.dark,
    border: `1px solid ${theme.palette.warning.main}`,
    "&:hover": {
      backgroundColor: "rgba(255, 193, 7, 0.2)",
    },
  }),
}));

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
    case "En Route":
      return <DirectionsCarIcon fontSize="small" sx={{ mr: 0.5 }} />;
    case "Ready":
      return <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />;
    default:
      return <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />;
  }
};

const getStatusTooltip = (status) => {
  switch (status) {
    case "En Route":
      return "Order is currently being delivered";
    case "Ready":
      return "Order is ready for pickup";
    default:
      return "Order status unknown";
  }
};

const OrdersTable = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/v1/orders/location/36726661/list?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Orders Data:", data);
        const transformed = data.data.map((o) => ({
          orderId: o.orderNumber,
          customer: o.customer?.name || "N/A",
          status: "Ready", // JSON has no status, default used
          noOfItems: o.orderItems?.length ?? 0,
          payment: o.paymentMethod || "Unknown",
          amount: o.costing?.totalCost || 0, // Extracting totalCost from costing object
          date: new Date(o.placementTime).toLocaleDateString(),
        }));
        setOrders(transformed);
        setFilteredOrders(transformed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });

    const channel = ablyClient.channels.get("order-36726661");
    const handleUpdate = (message) => {
      let order = message.data.text;
      if (typeof order === "string") {
        try {
          order = JSON.parse(order);
        } catch (e) {
          console.error("Parse error:", e);
          return;
        }
      }

      const transformedOrder = {
        orderId: order.orderNumber,
        customer: order.customer?.name || "N/A",
        status: "Ready",
        noOfItems: order.orderItems?.length ?? 0,
        payment: order.paymentMethod || "Unknown",
        amount: order.costing?.totalCost || 0, // Extracting totalCost from costing object
        date: new Date(order.placementTime).toLocaleDateString(),
      };

      setOrders((prev) => {
        const index = prev.findIndex((o) => o.orderId === transformedOrder.orderId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = transformedOrder;
          return updated;
        } else {
          return [...prev, transformedOrder];
        }
      });
    };

    channel.subscribe(handleUpdate);
    return () => channel.unsubscribe(handleUpdate);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  return (
    <StyledTableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
          Recent Orders
        </Typography>
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
            sx: { width: "250px" },
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ORDER ID</TableCell>
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
                <TableRow
                  key={order.orderId}
                  hover
                  sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {order.orderId}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={getStatusTooltip(order.status)} arrow>
                      <StatusPill status={order.status}>
                        {getStatusIcon(order.status)} {order.status}
                      </StatusPill>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 24, height: 24 }}>
                        {order.customer?.charAt(0) || "C"}
                      </Avatar>
                      <Typography variant="body2">{order.customer}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={order.noOfItems}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 500, fontSize: "0.7rem", height: "24px" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">{order.payment}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={500}>
                      £{order.amount.toFixed(2)} {/* Formatting to 2 decimal places */}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">{order.date}</Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="textSecondary">
                    No orders found matching your search
                  </Typography>
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