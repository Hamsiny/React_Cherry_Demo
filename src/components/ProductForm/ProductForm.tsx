import { Grid } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "../Controls/Button";
import { Input } from "../Controls/Input";
import { Form, UseForm } from "../UseForm";

const initialValues = {
  productId: "",
  productName: "",
  productCode: "",
  imageUrl: "",
  desciption: "",
  price: "",
  priceRrp: "",
  priceShopify: "",
  priceAgent: "",
  price1212: "",
  priceSpecial: "",
  height: "",
  width: "",
  length: "",
  weight: "",
  packageQty: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: 0,
  tOrder: [],
};

// const initialValues = {} as CProduct;

export const ProductForm = (props) => {
  const { setOpenPopup, productForEdit, setNotify } = props;
  const validate = (fieldValues = values) => {
    let temp = {
      ...errors,
    };

    if ("productName" in fieldValues)
      temp["productName"] = fieldValues.productName
        ? ""
        : "This field is required.";
    // if ("productCode" in fieldValues)
    //   temp["productCode"] = fieldValues.productCode
    //     ? ""
    //     : "This field is required.";
    // if ("imageUrl" in fieldValues)
    //   temp["imageUrl"] = fieldValues.imageUrl ? "" : "This field is required.";
    // if ("desciption" in fieldValues)
    //   temp["desciption"] = fieldValues.desciption
    //     ? ""
    //     : "This field is required.";
    if (values.price)
      temp["price"] = /^[0-9]+$/.test(fieldValues.price)
        ? ""
        : "You must input number.";
    if (values.priceRrp)
      temp["priceRrp"] = /^[0-9]+$/.test(fieldValues.priceRrp)
        ? ""
        : "You must input number.";
    if (values.priceShopify)
      temp["priceShopify"] = /^[0-9]+$/.test(fieldValues.priceShopify)
        ? ""
        : "You must input number.";
    if (values.priceAgent)
      temp["priceAgent"] = /^[0-9]+$/.test(fieldValues.priceAgent)
        ? ""
        : "You must input number.";
    if (values.price1212)
      temp["price1212"] = /^[0-9]+$/.test(fieldValues.price1212)
        ? ""
        : "You must input number.";
    if (values.priceSpecial)
      temp["priceSpecial"] = /^[0-9]+$/.test(fieldValues.priceSpecial)
        ? ""
        : "You must input number.";
    if (values.height)
      temp["height"] = /^[0-9]+$/.test(fieldValues.height)
        ? ""
        : "You must input number.";
    if (values.width)
      temp["width"] = /^[0-9]+$/.test(fieldValues.width)
        ? ""
        : "You must input number.";
    if (values.length)
      temp["length"] = /^[0-9]+$/.test(fieldValues.length)
        ? ""
        : "You must input number.";
    if (values.weight)
      temp["weight"] = /^[0-9]+$/.test(fieldValues.weight)
        ? ""
        : "You must input number.";
    if (values.packageQty)
      temp["packageQty"] = /^[0-9]+$/.test(fieldValues.packageQty)
        ? ""
        : "You must input number.";

    setErrors({ ...temp });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    UseForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (validate()) {
      // addOrEdit(values, resetForm);
      const dataToUse = {
        productId: values.productId,
        productName: values.productName,
        productCode: values.productCode,
        imageUrl: values.imageUrl,
        desciption: values.desciption,
        price: parseInt(values.price),
        priceRrp: parseInt(values.priceRrp),
        priceShopify: parseInt(values.priceShopify),
        priceAgent: parseInt(values.priceAgent),
        price1212: parseInt(values.price1212),
        priceSpecial: parseInt(values.priceSpecial),
        height: parseInt(values.height),
        width: parseInt(values.width),
        length: parseInt(values.length),
        weight: parseInt(values.weight),
        packageQty: parseInt(values.packageQty),
      };
      if (dataToUse.productId === "") {
        console.log(dataToUse);
        axios.post(
          "http://206.189.39.185:5031/api/Product/ProductCreate",
          dataToUse
        );
      } else {
        console.log(dataToUse);
        axios.put(
          "http://206.189.39.185:5031/api/Product/ProductUpdate",
          dataToUse
        );
      }
      resetForm();
      setOpenPopup(false);
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    }
  };

  useEffect(() => {
    if (productForEdit != null) {
      setValues({ ...productForEdit });
    }
  }, [productForEdit]);

  return (
    <div className="mt-2">
      {/* <h2>Product Form</h2> */}
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={4}>
            <Input
              label="Product Name"
              name="productName"
              value={values.productName || ""}
              onChange={handleInputChange}
              error={errors["productName"]}
            />
            <Input
              label="Product Code"
              name="productCode"
              value={values.productCode || ""}
              onChange={handleInputChange}
              // error={errors["productCode"]}
            />
            <Input
              label="Image Url"
              name="imageUrl"
              value={values.imageUrl || ""}
              onChange={handleInputChange}
              // error={errors["imageUrl"]}
            />
            <Input
              label="Description"
              name="desciption"
              value={values.desciption || ""}
              onChange={handleInputChange}
              // error={errors["desciption"]}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              label="Price"
              name="price"
              value={values.price || ""}
              onChange={handleInputChange}
              error={errors["price"]}
            />
            <Input
              label="Recommended Retail Price"
              name="priceRrp"
              value={values.priceRrp || ""}
              onChange={handleInputChange}
              error={errors["priceRrp"]}
            />
            <Input
              label="Shopify Price"
              name="priceShopify"
              value={values.priceShopify || ""}
              onChange={handleInputChange}
              error={errors["priceShopify"]}
            />
            <Input
              label="Agent Price"
              name="priceAgent"
              value={values.priceAgent || ""}
              onChange={handleInputChange}
              error={errors["priceAgent"]}
            />
            <Input
              label="Price of 12.12"
              name="price1212"
              value={values.price1212 || ""}
              onChange={handleInputChange}
              error={errors["price1212"]}
            />
            <Input
              label="Special Price"
              name="priceSpecial"
              value={values.priceSpecial || ""}
              onChange={handleInputChange}
              error={errors["priceSpecial"]}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              label="Height(cm)"
              name="height"
              value={values.height || ""}
              onChange={handleInputChange}
              error={errors["height"]}
            />
            <Input
              label="Width(cm)"
              name="width"
              value={values.width || ""}
              onChange={handleInputChange}
              error={errors["width"]}
            />
            <Input
              label="Length(cm)"
              name="length"
              value={values.length || ""}
              onChange={handleInputChange}
              error={errors["length"]}
            />
            <Input
              label="Weight(kg)"
              name="weight"
              value={values.weight || ""}
              onChange={handleInputChange}
              error={errors["weight"]}
            />
            <Input
              label="Quantity"
              name="packageQty"
              value={values.packageQty || ""}
              onChange={handleInputChange}
              error={errors["packageQty"]}
            />
          </Grid>
          <div>
            <Button type="submit" color="secondary" text="Submit" />
            <Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Form>
    </div>
  );
};
