import React, { Component } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';

export class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bgred">
          <Link className="navbar-brand" to="/">
            React Cherry Demo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Product Management
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/form">
                  Form
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;

// async componentDidMount() {
//     const getPromise = axios.get("http://206.189.39.185:5031/api/Product");
//     const result = (await getPromise).data.data;
//     this.setState({products: result});
//     console.log(this.state.products);
//   }
