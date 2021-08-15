import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import OrderPage from "./pages/OrderPage/OrderPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import MUIDrawer from "./components/MUIDrawer/MUIDrawer";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const App = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState<any>(null);

  const userTokenKey = "USER_TOKEN_KEY_CHERRY";

  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  useEffect(() => {
    if (getWithExpiry(userTokenKey) !== null) {
      setIsLoggedIn(true);
      setUserLoggedIn(getWithExpiry(userTokenKey));
    }
  }, []);

  const routes = [
    { path: "/", exact: true, component: <Home /> },
    {
      path: "/products",
      exact: false,
      isGuard: true,
      component: <ProductManagement notify={notify} setNotify={setNotify} />,
    },
    { path: "/order", exact: false, isGuard: true, component: <OrderPage /> },
    {
      path: "/register",
      exact: false,
      component: <RegisterPage notify={notify} setNotify={setNotify} />,
    },
    {
      path: "/login",
      exact: false,
      component: (
        <LogInPage
          notify={notify}
          setNotify={setNotify}
          userTokenKey={userTokenKey}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userLoggedIn={userLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
        />
      ),
    },
    { path: "*", exact: false, component: <NotFoundPage /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MUIDrawer
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userLoggedIn={userLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
          userTokenKey={userTokenKey}
        />
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact}>
              {route.isGuard ? (
                !isLoggedIn ? (
                  <Redirect to="/login" />
                ) : (
                  route.component
                )
              ) : (
                route.component
              )}
            </Route>
          ))}
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
