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
  FormControlLabel,
  FormGroup,
  Input,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { addToCart, removeFromCart } from "../actions/cartAction";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  paper: {
    height: "100%",
    width: "150vh",
    padding: "2rem",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const ShippingScreen = ({ history }) => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const theme = useTheme();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <>
      <CheckoutSteps step1 step2 />

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid item>
              <Paper className={classes.paper}>
                <form className={classes.container} onSubmit={submitHandler}>
                  <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={6} alignContent="flex-start">
                      <FormLabel component="legend">Shipping Details</FormLabel>
                    </Grid>
                    <Grid item xs={6} alignContent="flex-end">
                      <Link
                        style={{
                          color: "white",
                          backgroundColor: "#26A541",
                        }}
                        className="btn"
                        to="/home"
                      >
                        Go to Supermarket
                      </Link>
                    </Grid>
                  </Grid>

                  <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12} container justify="center">
                      <FormControl>
                        <InputLabel htmlFor="address-input">Address</InputLabel>
                        <Input
                          id="address-input"
                          aria-describedby="address-input-helper-text"
                          name="address"
                          error={hasError("address")}
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} container justify="center">
                      <FormControl>
                        <InputLabel htmlFor="city-input">City</InputLabel>
                        <Input
                          id="city-input"
                          aria-describedby="city-input-helper-text"
                          name="city"
                          error={hasError("city")}
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} container justify="center">
                      <FormControl>
                        <InputLabel htmlFor="postalcode-input">
                          Postal Code
                        </InputLabel>
                        <Input
                          id="postalcode-input"
                          aria-describedby="postalcode-input-helper-text"
                          name="postalcode"
                          error={hasError("postalcode")}
                          onChange={(e) => setPostalCode(e.target.value)}
                          value={postalCode}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} container justify="center">
                      <FormControl>
                        <InputLabel htmlFor="country-input">Country</InputLabel>
                        <Input
                          id="country-input"
                          aria-describedby="country-input-helper-text"
                          name="country"
                          error={hasError("country")}
                          onChange={(e) => setCountry(e.target.value)}
                          value={country}
                        />
                      </FormControl>
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
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ShippingScreen;
