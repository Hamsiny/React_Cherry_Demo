import React, { useEffect, useState } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import {
  Backdrop,
  CircularProgress,
  InputAdornment,
  TableSortLabel,
  TextField,
  Toolbar,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { TablePagination } from "@material-ui/core";
import { Button } from "../Controls/Button";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { Input } from "../Controls/Input";
import { Search } from "@material-ui/icons";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
      marginTop: theme.spacing(3),
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      position: "absolute",
      right: "10px",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    searchInput: {
      width: "20%",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const labels = [
  { id: "productName", label: "Product Name", align: true },
  { id: "qty", label: "Quantity", align: false },
  { id: "batchId", label: "Product Information", align: false },
  { id: "recipient", label: "Recipient", align: false },
  { id: "recipientAddr", label: "Recipient Address", align: false },
  { id: "senderName", label: "Sender", align: false },
  { id: "senderAddr", label: "Sender Address", align: false },
  { id: "createdAt", label: "Created Date", align: false, sorting: true },
  { id: "submitedAt", label: "Submited Date", align: false, sorting: true },
  { id: "trackNo", label: "Track Number", align: false },
  { id: "status", label: "Status", align: false },
];

const OrdersTable = () => {
  const [orders, setOrders] = useState<any>([]);
  const pages = [10, 20, 30];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState<any>();
  const [orderBy, setOrderBy] = useState<any>();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const classes = useStyles();

  const getOrders = () => {
    const ordersList: any[] = [];
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.productName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const date1Element = document.getElementById(
    "datetime-local1"
  ) as HTMLInputElement;
  const date2Element = document.getElementById(
    "datetime-local2"
  ) as HTMLInputElement;

  const dateFilter = () => {
    let startDateValue = "";
    let endDateValue = "";
    if (date1Element != null && date2Element != null) {
      startDateValue = date1Element.value;
      endDateValue = date2Element.value;
    }

    if (startDateValue && endDateValue) {
      const startDate = new Date(startDateValue);
      const endDate = new Date(endDateValue);
      const ordersFilter = orders.filter(
        (order) =>
          new Date(order.createdAt).getTime() > startDate.getTime() &&
          new Date(order.createdAt).getTime() < endDate.getTime()
      );
      return ordersFilter;
    }
    return orders;
  };

  const resetDate = () => {
    if (date1Element != null && date2Element != null) {
      date1Element.value = "";
      date2Element.value = "";
    }
  };

  const ordersAfterPagingAndFiltering = () => {
    return stableSort(
      filterFn.fn(dateFilter()),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return (
    <div className="mx-3">
      <h3>Order List</h3>
      {orders.length === 0 ? (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <></>
      )}
      <TableContainer component={Paper} className="mt-5">
        <Toolbar className="mt-2">
          <Input
            label="Search Orders"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local1"
              label="Start Date"
              variant="outlined"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="datetime-local2"
              label="End Date"
              variant="outlined"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <Button
              text="Search"
              variant="outlined"
              color="secondary"
              startIcon={<SearchIcon />}
              onClick={dateFilter}
            /> */}
            <Button
              text="Reset"
              variant="outlined"
              color="default"
              startIcon={<RotateLeftIcon />}
              onClick={resetDate}
            />
          </form>
        </Toolbar>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {labels.map((item) => (
                <StyledTableCell
                  key={item.id}
                  align={item.align ? "left" : "right"}
                >
                  {!item.sorting ? (
                    item.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === item.id}
                      direction={orderBy === item.id ? order : "asc"}
                      onClick={() => {
                        handleSortRequest(item.id);
                      }}
                    >
                      {item.label}
                    </TableSortLabel>
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dateFilter().length === 0 ? (
              <h3 className="m-2">There are no results.</h3>
            ) : (
              ordersAfterPagingAndFiltering().map((order) => (
                <StyledTableRow key={order.orderId}>
                  <StyledTableCell component="th" scope="row">
                    {order.productName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{order.qty}</StyledTableCell>
                  <StyledTableCell align="right">
                    {order.batchId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.recipient}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.recipientAddr}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.senderName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.senderAddr}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.submitedAt}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.trackNo}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.status}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={dateFilter().length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
