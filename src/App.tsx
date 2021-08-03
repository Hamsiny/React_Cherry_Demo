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
import MUIDrawer from "./components/MUIDrawer/MUIDrawer";

const routes = [
  { path: "/", exact: true, component: <Home /> },
  { path: "/products", exact: false, component: <ProductManagement /> },
  { path: "/order", exact: false, component: <OrderPage /> },
  { path: "/register", exact: false, component: <RegisterPage /> },
  { path: "/login", exact: false, component: <LogInPage /> },
];

function App() {
  return (
    <Router>
      <MUIDrawer />
      <Switch>
        {routes.map((route) => (
          <Route path={route.path} exact={route.exact}>
            {route.component}
          </Route>
        ))}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
