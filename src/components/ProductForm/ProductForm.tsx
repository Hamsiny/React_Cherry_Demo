import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import CProduct from "../../models/CProduct";
import { Form, UseForm } from "../UseForm";



const initialValues: CProduct = {
  productId: 0,
  productName: "",
  productCode: "",
  imageUrl: "",
  desciption: "",
  price: 0,
  priceRrp: 0,
  priceShopify: 0,
  priceAgent: 0,
  price1212: 0,
  priceSpecial: 0,
  height: 0,
  width: 0,
  length: 0,
  weight: 0,
  packageQty: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: 0,
  tOrder: [],
};

export const ProductForm = () => {

  const { values, setValues, handleInputChange } = UseForm(initialValues);

  return (
    <div className="mt-5">
      <h2>Product Form</h2>
      <Form>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Product Name"
              name="productName"
              value={values.productName}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Description"
              name="desciption"
              value={values.desciption}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Form>
    </div>
  );
};
