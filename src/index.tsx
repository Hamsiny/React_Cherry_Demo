import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "font-awesome/css/font-awesome.min.css";
// import axios from "axios";


// axios.interceptors.request.use(
//   (request) => {
//     if (request.url?.includes("products") || request.url?.includes("orders")) {
//       request.headers["Authorization"] = getWithExpiry("USER_TOKEN_KEY_CHERRY").token;
//     }
//     console.log(request);
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(response => {
//   console.log(response);
//   return response;
// });

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
