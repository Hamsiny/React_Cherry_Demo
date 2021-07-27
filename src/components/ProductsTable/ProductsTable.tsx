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
import { UseTable } from "../UseTable";
import { TablePagination } from "@material-ui/core";

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

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const ProductsTable = () => {
  const [products, setProducts] = useState<CProduct[]>([]);
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

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

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const productsAfterPagingAndSoring = () => {
    return products.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }

  const rows = productsAfterPagingAndSoring().map((pro) => {
    return {
      productId: pro.productId,
      productName: pro.productName,
      desciption: pro.desciption,
      price: pro.price,
      height: pro.height,
      width: pro.width,
      length: pro.length,
      weight: pro.weight,
      packageQty: pro.packageQty,
    };
  });

  return (
    <div>
      <div className="mt-5">
        <h3>Product List</h3>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Price&nbsp;($)</StyledTableCell>
                <StyledTableCell align="right">Weight&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">
                  Size (H * W * L)
                </StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.productId}>
                  <StyledTableCell component="th" scope="row">
                    {row.productName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.desciption}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">{row.weight}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.height} * {row.width} * {row.length}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.packageQty}
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
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div>
  );
};

export default ProductsTable;

////////////////////////////////////
