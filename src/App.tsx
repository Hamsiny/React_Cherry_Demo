import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path= '/' exact>
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
