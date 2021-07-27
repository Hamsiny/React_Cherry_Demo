import { makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { ProductForm } from "../ProductForm/ProductForm";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  // searchInput: {
  //     width: '75%'
  // },
  // newButton: {
  //     position: 'absolute',
  //     right: '10px'
  // }
}));

export const Products = () => {

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.pageContent}>
        <ProductForm />
      </Paper>
    </div>
  );
};
