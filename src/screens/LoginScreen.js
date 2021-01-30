import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/controls/Spinner";
import { login } from "../actions/userAction";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import validate from "validate.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 300,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 300,
    },
  },
};

const LoginScreen = ({ location, history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/home";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formState.isValid) {
      window.location.replace("/");
    }

    setFormState((formState) => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };
  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Spinner />}
      <div className={classes.root}>
        <form method="post" onSubmit={submitHandler}>
          <Grid container spacing={2} align="center">
            <Grid item xs={12}>
              <TextField
                placeholder="E-mail"
                label="E-mail *"
                variant="outlined"
                size="small"
                name="email"
                helperText={
                  hasError("email") ? formState.errors.email[0] : null
                }
                error={hasError("email")}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                // value={formState.values.email || ""}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Password"
                label="Password*"
                variant="outlined"
                size="small"
                name="password"
                helperText={
                  hasError("password") ? formState.errors.password[0] : null
                }
                error={hasError("password")}
                // onChange={handleChange}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                // value={formState.values.password || ""}
              />
            </Grid>

            <Grid item xs={12}>
              <i>
                <Typography variant="subtitle2">
                  Fields that are marked with * sign are required.
                </Typography>
              </i>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="small"
                variant="contained"
                type="submit"
                color="primary"
              >
                Sign In
              </Button>
              <Button
                size="small"
                variant="contained"
                type="submit"
                color="primary"
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                align="center"
              >
                Remember your password?{" "}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;
