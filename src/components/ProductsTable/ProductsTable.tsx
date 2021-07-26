import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../models/Product";
import CProduct from "../../models/CProduct";

const ProductsTable = () => {
  const [product, setProduct] = useState<CProduct[]>([]);

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

  return (
    <div>
      <h1>This is product management page.</h1>
      <div>
        {product.map((pro) => (
          <h4 key={pro.productId}>{pro.productName}</h4>
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
