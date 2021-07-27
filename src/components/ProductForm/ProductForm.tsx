import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import CProduct from "../../models/CProduct";
import { Button } from "../Controls/Button";
import { Input } from "../Controls/Input";
import { Form, UseForm } from "../UseForm";

// const initialValues: CProduct = {
//   productId: 0,
//   productName: "",
//   productCode: "",
//   imageUrl: "",
//   desciption: "",
//   price: 0,
//   priceRrp: 0,
//   priceShopify: 0,
//   priceAgent: 0,
//   price1212: 0,
//   priceSpecial: 0,
//   height: 0,
//   width: 0,
//   length: 0,
//   weight: 0,
//   packageQty: 0,
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isActive: 0,
//   tOrder: [],
// };

const initialValues = {} as CProduct;

export const ProductForm = () => {
  const validate = () => {
    let temp = {} as CProduct;
    temp.productName = values.productName ? "" : "This field is required.";
    temp.desciption = values.desciption ? "" : "This field is required.";
    setErrors({ ...temp });

    return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } =
    UseForm(initialValues);

  const handleSubmit = (e) => {
      e.preventDefault();
    if (validate()) {
      alert("test");
    }
  };

  return (
    <div className="mt-5">
      <h2>Product Form</h2>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={4}>
            <Input
              label="Product Name"
              name="productName"
              value={values.productName}
              onChange={handleInputChange}
              error={errors['productName']}
            />
            <Input
              label="Description"
              name="desciption"
              value={values.desciption}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              label="Price"
              name="price"
              value={values.price}
              onChange={handleInputChange}
            />
            <Input
              label="Recommended Retail Price"
              name="priceRrp"
              value={values.priceRrp}
              onChange={handleInputChange}
            />
            <Input
              label="Shopify Price"
              name="priceShopify"
              value={values.priceShopify}
              onChange={handleInputChange}
            />
            <Input
              label="Agent Price"
              name="priceAgent"
              value={values.priceAgent}
              onChange={handleInputChange}
            />
            <Input
              label="Price of 12.12"
              name="price1212"
              value={values.price1212}
              onChange={handleInputChange}
            />
            <Input
              label="Special Price"
              name="priceSpecial"
              value={values.priceSpecial}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              label="Height(cm)"
              name="height"
              value={values.height}
              onChange={handleInputChange}
            />
            <Input
              label="Width(cm)"
              name="width"
              value={values.width}
              onChange={handleInputChange}
            />
            <Input
              label="Length(cm)"
              name="length"
              value={values.length}
              onChange={handleInputChange}
            />
            <Input
              label="Weight(kg)"
              name="weight"
              value={values.weight}
              onChange={handleInputChange}
            />
          </Grid>
          <div>
            <Button type="submit" color="secondary" text="Submit" />
            <Button text="Reset" color="default" />
          </div>
        </Grid>
      </Form>
    </div>
  );
};
