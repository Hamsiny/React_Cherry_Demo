import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { Input } from "../Controls/Input";
import { Form, UseForm } from "../UseForm";
import axios from "axios";
import Notification from "../Notification/Notification";

const initialRegisterValues = {
  password: "",
  userName: "",
  type: "",
  discountRate: "",
  firstName: "",
  lastName: "",
  companyName: "",
  mobileNumber: "",
  email: "",
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

const Register = (props) => {
  const { notify, setNotify } = props;
  const classes = useStyles();
  const validate = (fieldValues = values) => {
    let temp = {
      ...errors,
    };

    if ("userName" in fieldValues)
      temp["userName"] = fieldValues.userName ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp["password"] = fieldValues.password ? "" : "This field is required.";
    if ("type" in fieldValues)
      temp["type"] = fieldValues.type ? "" : "This field is required.";
    if ("discountRate" in fieldValues)
      temp["discountRate"] = fieldValues.discountRate
        ? ""
        : "This field is required.";
    if (values.mobileNumber)
      temp["mobileNumber"] = /^[0-9]+$/.test(fieldValues.mobileNumber)
        ? ""
        : "You must input number.";
    if (values.email)
      temp["email"] = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
        fieldValues.email
      )
        ? ""
        : "You must input valid email address.";

    setErrors({ ...temp });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = UseForm(
    initialRegisterValues,
    true,
    validate
  );
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToUse = {
        password: values.password,
        userName: values.userName,
        type: parseInt(values.type),
        discountRate: parseInt(values.discountRate),
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName,
        mobileNumber: values.mobileNumber,
        email: values.email,
      };
      console.log(dataToUse);
      axios
        .post("http://206.189.39.185:5031/api/User/UserRegister", dataToUse)
        .then(() => {
          resetForm();
          setNotify({
            isOpen: true,
            message: "Your Account created Successfully",
            type: "success",
          });

          setTimeout(function() {
              history.push("/login");
          }, 2100);
        })
        .catch((error) => {
          console.log(error);
          setNotify({
            isOpen: true,
            message: "Error Occured",
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
          Register
        </Typography>
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
            <Grid item xs={12} sm={6}>
              <Input
                label="First Name"
                name="firstName"
                value={values.firstName || ""}
                onChange={handleInputChange}
                error={errors["firstName"]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Last Name"
                name="lastName"
                value={values.lastName || ""}
                onChange={handleInputChange}
                error={errors["lastName"]}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Mobile Number"
                name="mobileNumber"
                value={values.mobileNumber || ""}
                onChange={handleInputChange}
                error={errors["mobileNumber"]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Email Address"
                name="email"
                value={values.email || ""}
                onChange={handleInputChange}
                error={errors["email"]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Company Name"
                name="companyName"
                value={values.companyName || ""}
                onChange={handleInputChange}
                error={errors["companyName"]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Type Number"
                name="type"
                value={values.type || ""}
                onChange={handleInputChange}
                error={errors["type"]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Discount Rate"
                name="discountRate"
                value={values.discountRate || ""}
                onChange={handleInputChange}
                error={errors["discountRate"]}
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Log in</Link>
            </Grid>
          </Grid>
        </Form>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </Container>
  );
}

export default Register;
