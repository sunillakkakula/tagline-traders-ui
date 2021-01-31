import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartAction";
import { Link } from "react-router-dom";
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Select,
  IconButton,
  Paper,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { addToCart, removeFromCart } from "../actions/cartAction";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "80vh",
    width: "80vh",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const ShippingScreen = ({ history }) => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <Typography variant="subtitle1" gutterBottom>
        Shopping Cart
        <Link
          style={{
            color: "white",
            backgroundColor: "#26A541",
            marginLeft: "10rem",
          }}
          className="btn"
          to="/home"
          align="right"
        >
          Go to Supermarket
        </Link>
      </Typography>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid item>
              <Paper className={classes.paper} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ShippingScreen;
