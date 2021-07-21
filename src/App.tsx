import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductManagement from "./pages/ProductManagement/ProductManagement";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path= '/' exact>
          <Home />
        </Route>
        <Route path= '/products' exact>
          <ProductManagement />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
