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
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              label="Price"
              name="price"
              placeholder=""
              value={values.price}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Recommended Retail Price"
              name="priceRrp"
              value={values.priceRrp}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Shopify Price"
              name="priceShopify"
              value={values.priceShopify}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Agent Price"
              name="priceAgent"
              value={values.priceAgent}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Price of 12.12"
              name="price1212"
              value={values.price1212}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Special Price"
              name="priceSpecial"
              value={values.priceSpecial}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              label="Height(cm)"
              name="height"
              value={values.height}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Width(cm)"
              name="width"
              value={values.width}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Length(cm)"
              name="length"
              value={values.length}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Weight(kg)"
              name="weight"
              value={values.weight}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};
