import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartAction";
import { Link } from "react-router-dom";
import {
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Button,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Button from "../components/controls/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  paper: {
    height: "100%",
    width: "100vh",
    padding: "2rem",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const classes = useStyles();
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const [paymentMethod, setPaymentMethod] = useState("gpay");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} container justify="center">
          <Paper className={classes.paper}>
            <form onSubmit={submitHandler}>
              <Grid container className={classes.root} spacing={1}>
                <Grid item xs={6}>
                  <FormLabel component="legend">Payment Details</FormLabel>
                </Grid>
                <Grid item xs={6}>
                  <Link
                    style={{
                      color: "white",
                      backgroundColor: "#26A541",
                      // marginLeft: "10rem",
                    }}
                    className="btn"
                    align="right"
                    to="/home"
                  >
                    Go to Supermarket
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs={12} container>
                <RadioGroup
                  aria-label="payment"
                  name="payment"
                  value={paymentMethod}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="gpay"
                    control={<Radio />}
                    label="G-Pay"
                  />
                  <FormControlLabel
                    value="upi"
                    control={<Radio />}
                    label="UPI payment"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} container justify="center">
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Continue
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentScreen;
