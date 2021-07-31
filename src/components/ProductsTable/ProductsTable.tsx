import React, { useEffect, useState } from "react";
import axios from "axios";
import CProduct from "../../models/CProduct";
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
import {
  InputAdornment,
  TablePagination,
  TableSortLabel,
  Toolbar,
} from "@material-ui/core";
import { Input } from "../Controls/Input";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "../Controls/Button";
import Popup from "../Popup/Popup";
import { ProductForm } from "../ProductForm/ProductForm";
import Product from "../../models/Product";
import ActionButton from "../Controls/ActionButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      // color: theme.palette.primary.main,
      // backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#FFF3F1",
      cursor: "pointer",
    },
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "30%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

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

const ProductsTable = () => {
  const [products, setProducts] = useState<CProduct[]>([]);
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
  const [openPopup, setOpenPopup] = useState(false);
  const [productForEdit, setProductForEdit] = useState(null);

  const classes = useStyles();

  const fetchData = async () => {
    const data = await axios.get("http://206.189.39.185:5031/api/Product");
    console.log(data.data.data);
    return data.data.data;
  };

  useEffect(() => {
    const getProducts = async () => {
      const dataFromServer = await fetchData();
      setProducts(dataFromServer);
    };
    getProducts();
  }, []);

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

  const productsAfterPagingAndSoring = () => {
    return stableSort(
      filterFn.fn(products),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.productName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const openInPopup = (product) => {
    setProductForEdit(product);
    setOpenPopup(true);
  };

  // const rows = productsAfterPagingAndSoring().map((pro) => {
  //   return {
  //     productId: pro.productId,
  //     productName: pro.productName,
  //     desciption: pro.desciption,
  //     price: pro.price,
  //     height: pro.height,
  //     width: pro.width,
  //     length: pro.length,
  //     weight: pro.weight,
  //     packageQty: pro.packageQty,
  //   };
  // });

  const labels = [
    { id: "productName", label: "Product Name", align: true },
    {
      id: "description",
      label: "Description",
      align: false,
      disableSorting: true,
    },
    { id: "price", label: "Price ($)", align: false },
    { id: "weight", label: "Weight (g)", align: false },
    { id: "size", label: "Size (H * W * L)", align: false },
    { id: "packageQty", label: "Quantity", align: false },
    { id: "actions", label: "Actions", align: false, disableSorting: true },
  ];

  return (
    <div>
      <div className="mt-5">
        <h3>Product List</h3>
        <TableContainer component={Paper} className="mt-5">
          <Toolbar>
            <Input
              label="Search Employees"
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
            <Button
              text="Add New"
              variant="outlined"
              color="secondary"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setProductForEdit(null);
              }}
            />
          </Toolbar>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                {labels.map((label) => (
                  <StyledTableCell
                    align={label.align ? "left" : "right"}
                    key={label.id}
                    sortDirection={orderBy === label.id ? order : false}
                  >
                    {label.disableSorting ? (
                      label.label
                    ) : (
                      <TableSortLabel
                        active={orderBy === label.id}
                        direction={orderBy === label.id ? order : "asc"}
                        onClick={() => {
                          handleSortRequest(label.id);
                        }}
                      >
                        {label.label}
                      </TableSortLabel>
                    )}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productsAfterPagingAndSoring().map((product) => (
                <StyledTableRow key={product.productId}>
                  <StyledTableCell component="th" scope="row">
                    {product.productName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.desciption}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.price}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.weight}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.height} * {product.width} * {product.length}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.packageQty}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <ActionButton
                      color="default"
                      onClick={() => {
                        openInPopup(product);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton color="default">
                      <CloseIcon fontSize="small" />
                    </ActionButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={products.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <Popup
          title="Add a Product"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <ProductForm setOpenPopup={setOpenPopup} productForEdit={productForEdit}  />
        </Popup>
      </div>
    </div>
  );
};

export default ProductsTable;

////////////////////////////////////
