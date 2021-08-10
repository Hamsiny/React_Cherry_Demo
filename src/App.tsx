import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import OrderPage from "./pages/OrderPage/OrderPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import MUIDrawer from "./components/MUIDrawer/MUIDrawer";
import { useState } from "react";

function App() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const routes = [
    { path: "/", exact: true, component: <Home /> },
    {
      path: "/products",
      exact: false,
      component: <ProductManagement notify={notify} setNotify={setNotify} />,
    },
    { path: "/order", exact: false, component: <OrderPage /> },
    {
      path: "/register",
      exact: false,
      component: <RegisterPage notify={notify} setNotify={setNotify} />,
    },
    {
      path: "/login",
      exact: false,
      component: <LogInPage notify={notify} setNotify={setNotify} />,
    },
  ];

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
