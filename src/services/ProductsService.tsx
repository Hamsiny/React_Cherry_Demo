import axios from "axios";
import React from "react";

export const ProductsService = () => {
  async function getProductsAsync() {
    const data = await axios.get("http://206.189.39.185:5031/api/Product");
    console.log(data.data.data);
    return data.data.data;
  }

  async function getProducts() {
    const dataFromServer = await getProductsAsync();
    return dataFromServer;
  }

  const products = getProducts();

  return <div></div>;
};
