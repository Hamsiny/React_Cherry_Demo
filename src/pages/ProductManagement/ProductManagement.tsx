import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Product from "../../models/Product";
import CProduct from "../../models/CProduct";
import ProductsTable from "../../components/ProductsTable/ProductsTable";

// export class ProductManagement extends Component {
//   state = {
//     products: [],
//   };

//   getData = () => {};

//   componentDidMount() {
//     // this.getData();
//     axios.get("http://206.189.39.185:5031/api/Product").then((response) => {
//       // console.log(response.data.data);

//       this.setState({ products: response.data.data });
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>This is product management page.</h1>
//         <div>
//           {this.state.products.map((pro) => (
//             <h4 key={pro["productId"]}>{pro["productId"]}</h4>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// export default ProductManagement;

const ProductManagement = () => {
  return (
    <>
      <ProductsTable />
    </>
  );
};
export default ProductManagement;
