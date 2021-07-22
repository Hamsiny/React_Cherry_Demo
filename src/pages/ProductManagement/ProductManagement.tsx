import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Product from "../../models/Product";
import CProduct from "../../models/CProduct";

export class ProductManagement extends Component {
  state = {
    products: [],
  };

  getData = () => {};

  componentDidMount() {
    // this.getData();
    axios.get("http://206.189.39.185:5031/api/Product").then((response) => {
      // console.log(response.data.data);

      this.setState({ products: response.data.data });
    });
  }

  render() {
    return (
      <div>
        <h1>This is product management page.</h1>
        <div>
          {this.state.products.map((pro) => (
            <h4 key={pro["productId"]}>{pro["productId"]}</h4>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductManagement;

// const ProductManagement = () => {
//   const [data, setData] = useState<CProduct[]>([]);

//   const fetchData = async () => {
//     const res = await fetch("http://206.189.39.185:5031/api/Product");
//     const data = await res.json();
//     console.log(data.data);
//     return data.data;
//   };

//   useEffect(() => {
//     const getData = async () => {
//       const dataFromServer = await fetchData();
//       setData(dataFromServer);
//     };
//     getData();
//   }, []);

//   return (
//     <div>
//       <h1>This is product management page.</h1>
//       <div>
//         {data.map((pro) => (
//           <h4 key={pro.productId}>{pro.productName}</h4>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;
