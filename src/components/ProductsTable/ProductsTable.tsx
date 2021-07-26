import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../models/Product";
import CProduct from "../../models/CProduct";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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

  const rows = product.map(pro => {
    return {
      productId: pro.productId,
      productName: pro.productName,
      description: pro.description,
      price: pro.price,
      height: pro.height,
      width: pro.width,
      length: pro.length,
      weight: pro.weight,
      packageQty: pro.packageQty
    }
  })

  return (
    <div>
      <div className="mt-5">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Price&nbsp;($)</TableCell>
                <TableCell align="right">Weight&nbsp;(g)</TableCell>
                <TableCell align="right">Size (H * W * L)</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.productId}>
                  <TableCell component="th" scope="row">
                    {row.productName}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{row.height} * {row.width} * {row.length}</TableCell>
                  <TableCell align="right">{row.packageQty}</TableCell>
                </TableRow>
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
