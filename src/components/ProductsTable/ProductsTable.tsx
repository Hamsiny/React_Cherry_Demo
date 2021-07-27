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
import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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
  const [product, setProduct] = useState<CProduct[]>([]);
  const classes = useStyles();

  const fetchData = async () => {
    const data = await axios.get("http://206.189.39.185:5031/api/Product");
    console.log(data.data.data);
    return data.data.data;
  };

  useEffect(() => {
    const getProduct = async () => {
      const dataFromServer = await fetchData();
      setProduct(dataFromServer);
    };
    getProduct();
  }, []);

  const rows = product.map((pro) => {
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
        <TableContainer component={Paper} className="mt-5">
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Price&nbsp;($)</StyledTableCell>
                <StyledTableCell align="right">Weight&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Size (H * W * L)</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.productId}>
                  <StyledTableCell component="th" scope="row">
                    {row.productName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.desciption}</StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">{row.weight}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.height} * {row.width} * {row.length}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.packageQty}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProductsTable;

////////////////////////////////////
