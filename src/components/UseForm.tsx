import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

export const UseForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return {
    values,
    setValues,
    handleInputChange,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export const Form = (props) => {
  const classes = useStyles();

  return <form className={classes.root}>{props.children}</form>;
};
