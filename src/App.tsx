import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import { Products } from "./components/Products/Products";
import CollapsibleTable from "./components/CollapsibleTable/Collapsibletable";
import OrderPage from "./pages/OrderPage/OrderPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LogInPage from "./pages/LogInPage/LogInPage";

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
        <Route path= '/testtable' exact>
          <CollapsibleTable />
        </Route>
        <Route path= '/order' exact>
          <OrderPage />
        </Route>
        <Route path= '/register' exact>
          <RegisterPage />
        </Route>
        <Route path= '/login' exact>
          <LogInPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
