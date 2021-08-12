import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { Form, UseForm } from "../UseForm";
import { Input } from "../Controls/Input";
import axios from "axios";
import Notification from "../Notification/Notification";

const initialLoginValues = {
  userName: "",
  password: "",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LogIn = (props) => {
  const { notify, setNotify, userTokenKey, setIsLoggedIn, setUserLoggedIn } =
    props;
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setNotify({
      isOpen: true,
      message: "You Need to Log In",
      type: "error",
    });
  }, []);

  const checkboxElement = document.getElementById(
    "rememberCheckbox"
  ) as HTMLInputElement;

  const validate = (fieldValues = values) => {
    let temp = {
      ...errors,
    };

    if ("userName" in fieldValues)
      temp["userName"] = fieldValues.userName ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp["password"] = fieldValues.password ? "" : "This field is required.";

    setErrors({ ...temp });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = UseForm(
    initialLoginValues,
    true,
    validate
  );

  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToUse = {
        userName: values.userName,
        password: values.password,
      };
      axios
        .post("http://206.189.39.185:5031/api/User/UserLogin", dataToUse)
        .then((response) => {
          console.log(response);
          const user = response.data.data;
          if (checkboxElement !== null) {
            if (checkboxElement.checked) {
              setWithExpiry(userTokenKey, user, 604800000);
              setIsLoggedIn(true);
              setUserLoggedIn(user);
            } else {
              setUserLoggedIn(user);
              setIsLoggedIn(true);
            }
          }
          resetForm();
          setNotify({
            isOpen: true,
            message: "Log In Successfully",
            type: "success",
          });

          setTimeout(function() {
              history.push("/");
          }, 2100);
        })
        .catch((error) => {
          console.log(error);
          setNotify({
            isOpen: true,
            message: "Errors Occured on Log In",
            type: "error",
          });
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {/* <Typography component="h1" variant="h5">
          {sessionStorage.getItem(userTokenKey)}
        </Typography> */}
        <Form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                label="User Name"
                name="userName"
                value={values.userName || ""}
                onChange={handleInputChange}
                error={errors["userName"]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Password"
                name="password"
                value={values.password || ""}
                onChange={handleInputChange}
                error={errors["password"]}
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="rememberCheckbox"
                    value="remember"
                    color="secondary"
                  />
                }
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Form>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </Container>
  );
};

export default LogIn;
