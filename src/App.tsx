import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductManagement from "./pages/ProductManagement/ProductManagement";
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
          <Route key={route.path} path={route.path} exact={route.exact}>
            {route.component}
          </Route>
        ))}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
