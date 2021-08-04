import React, { useEffect, useState } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Orders from "../../models/Orders";
import axios from "axios";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#DF5E5E",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const labels = [
  { id: "productName", label: "Product Name", align: true },
  { id: "qty", label: "Quantity", align: false },
  { id: "batchId", label: "Product Information", align: false },
  { id: "recipient", label: "Recipient", align: false },
  { id: "recipientAddr", label: "Recipient Address", align: false },
  { id: "senderName", label: "Sender Name", align: false },
  { id: "senderAddr", label: "Sender Address", align: false },
  { id: "createdAt", label: "Created Date", align: false },
  { id: "submitedAt", label: "Submited Date", align: false },
  { id: "trackNo", label: "Track Number", align: false },
  { id: "status", label: "Order Status", align: false },
];

const OrdersTable = () => {
  const [orders, setOrders] = useState<any>([]);
  const classes = useStyles();

  const getOrders = () => {
    const ordersList: Orders[] = [];
    axios
      .get("http://206.189.39.185:5031/api/Order/GetOrderList/userId/status")
      .then((response) => {
        response.data.data.forEach((order: any) => {
          ordersList.push(order);
        });
        setOrders(ordersList);
      });
  };

  useEffect(() => {
    getOrders();
  }, [orders]);

  return (
    <div className="mx-3">
      <h3>Order List</h3>
      <TableContainer component={Paper} className="mt-5">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {labels.map((item) => (
                <StyledTableCell
                  key={item.id}
                  align={item.align ? "left" : "right"}
                >
                  {item.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.orderId}>
                <StyledTableCell component="th" scope="row">
                  {order.productName}
                </StyledTableCell>
                <StyledTableCell align="right">{order.qty}</StyledTableCell>
                <StyledTableCell align="right">{order.batchId}</StyledTableCell>
                <StyledTableCell align="right">{order.recipient}</StyledTableCell>
                <StyledTableCell align="right">{order.recipientAddr}</StyledTableCell>
                <StyledTableCell align="right">{order.senderName}</StyledTableCell>
                <StyledTableCell align="right">{order.senderAddr}</StyledTableCell>
                <StyledTableCell align="right">{order.createdAt}</StyledTableCell>
                <StyledTableCell align="right">{order.submitedAt}</StyledTableCell>
                <StyledTableCell align="right">{order.trackNo}</StyledTableCell>
                <StyledTableCell align="right">{order.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
