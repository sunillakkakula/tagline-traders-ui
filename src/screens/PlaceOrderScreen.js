import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderAction";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import {
  Button,
  FormLabel,
  Paper,
  useMediaQuery,
  Grid,
  Typography,
  Select,
  IconButton,
  FormControlLabel,
  FormGroup,
  Input,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Icon,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Image } from "@material-ui/icons";
import { Divider } from "@material-ui/core";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  imageIcon: {
    height: "100%",
  },
  paper: {
    height: "100%",
    width: "150vh",
    padding: ".5rem",
  },
  control: {
    padding: theme.spacing(2),
  },
  link: {
    color: "white",
    backgroundColor: "#26A541",
  },
  iconRoot: {
    textAlign: "center",
  },
}));
const PlaceOrderScreen = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      {/* <CheckoutSteps step1 step2 step3 /> */}
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={8} container justify="center">
          <Paper className={classes.paper}>
            <form onSubmit={placeOrderHandler}>
              <Grid container className={classes.root} spacing={1}>
                <Grid item xs={6}>
                  <FormLabel component="legend">Order Details</FormLabel>
                </Grid>
                <Grid item xs={6}>
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
              <Divider />
              <Grid item container>
                <Grid item xs={2} container justify="flex-start">
                  Shipping Details
                </Grid>
                <Grid item xs={10}>
                  <Grid container>
                    <Grid item xs={12}>
                      {""}
                      {cart.shippingAddress.address}
                    </Grid>
                    <Grid item xs={12}>
                      {cart.shippingAddress.city}
                    </Grid>
                    <Grid item xs={12}>
                      {cart.shippingAddress.postalCode}
                    </Grid>
                    <Grid item xs={12}>
                      {cart.shippingAddress.country}
                    </Grid>
                  </Grid>

                  {/* {cart.shippingAddress.city}
                  {cart.shippingAddress.postalCode}
                  {cart.shippingAddress.country} */}
                </Grid>
              </Grid>
              <Divider />
              <Grid item container>
                {/* <Grid item xs={2} container justify="flex-start">
                  Item Details
                </Grid> */}
                <Grid item xs={12} container>
                  {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <Grid conatiner row>
                      {cart.cartItems.map((item, index) => (
                        <Grid item key={index}>
                          <Grid container>
                            <Grid item xs={3}>
                              <img
                                className="img-thumbnail"
                                src={item.image}
                                alt={item.name}
                                style={{
                                  height: "3.5rem",
                                  width: "3.5rem",
                                  // justify: "flex-start",
                                  marginRight: "5rem",
                                }}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Link
                                to={`/product/${item.product}`}
                                style={{
                                  justify: "center",
                                  marginRight: "5rem",
                                }}
                              >
                                {item.name}
                              </Link>
                            </Grid>
                            <Grid item xs={3}>
                              {item.qty} x{" "}
                              <Icon classes={{ root: classes.iconRoot }}>
                                <img alt="curency inr" src={rupeeSvgIcon} />
                              </Icon>
                              {item.price}=
                            </Grid>
                            <Grid item xs={3} align="right">
                              <Icon classes={{ root: classes.iconRoot }}>
                                <img
                                  alt="curency inr"
                                  src={rupeeSvgIcon}
                                  className={classes.imageIcon}
                                />
                              </Icon>
                              {item.qty * item.price}
                            </Grid>
                          </Grid>
                          <Divider />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={4} container justify="center">
          <Paper className={classes.paper}>
            {/* <form onSubmit={placeOrderHandler}> */}
            <FormLabel component="legend"> Order Summary</FormLabel>
            <Divider />
            <Grid
              container
              spacing={1}
              row
              justifyContent="center"
              justify="center"
            >
              <Grid item xs={12} justifyContent="center" justify="center">
                <Grid container>
                  <Grid item xs={6}>
                    Items Cost
                  </Grid>
                  <Grid item xs={6}>
                    <Icon classes={{ root: classes.iconRoot }}>
                      <img alt="curency inr" src={rupeeSvgIcon} />
                    </Icon>
                    {cart.itemsPrice}
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    Shipping Cost
                  </Grid>
                  <Grid item xs={6}>
                    <Icon classes={{ root: classes.iconRoot }}>
                      <img alt="curency inr" src={rupeeSvgIcon} />
                    </Icon>
                    {cart.shippingPrice}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    Tax
                  </Grid>
                  <Grid item xs={6}>
                    <Icon classes={{ root: classes.iconRoot }}>
                      <img alt="curency inr" src={rupeeSvgIcon} />
                    </Icon>
                    {cart.taxPrice}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    Total
                  </Grid>
                  <Grid item xs={6}>
                    <Icon classes={{ root: classes.iconRoot }}>
                      <img alt="curency inr" src={rupeeSvgIcon} />
                    </Icon>
                    {cart.totalPrice}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {error && <Message variant="danger">{error}</Message>}
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems === 0}
                  justify="center"
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
            {/* </form> */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderScreen;
