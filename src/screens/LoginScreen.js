import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/controls/Spinner";
import { login } from "../actions/userAction";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button, TextField, Paper } from "@material-ui/core";
import validate from "validate.js";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "30vh",
    width: "50vh",
  },
  inputText: {
    margin: "auto",
    padding: "1rem",
    alignContent: "center",
  },
  customBtnStyle: {
    margin: "auto",
    padding: "1rem",
    alignContent: "center",
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

      <Grid container className={classes.root} spacing={2} justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              <form onSubmit={submitHandler}>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.inputText}
                      align="center"
                      placeholder="E-mail"
                      label="E-mail *"
                      variant="outlined"
                      size="small"
                      name="email"
                      fullWidth
                      helperText={
                        hasError("email") ? formState.errors.email[0] : null
                      }
                      error={hasError("email")}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      value={email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.inputText}
                      placeholder="Password"
                      label="Password*"
                      variant="outlined"
                      size="small"
                      name="password"
                      fullWidth
                      helperText={
                        hasError("password")
                          ? formState.errors.password[0]
                          : null
                      }
                      error={hasError("password")}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      value={password}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          className={classes.customBtnStyle}
                          size="small"
                          variant="contained"
                          type="submit"
                          color="primary"
                        >
                          Sign In
                        </Button>
                      </Grid>
                      <Grid item xs={12} style={{ alignContent: "center" }}>
                        New Customer?{" "}
                        <Link
                          to={
                            redirect
                              ? `/register?redirect=${redirect}`
                              : "/register"
                          }
                        >
                          Register
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginScreen;
