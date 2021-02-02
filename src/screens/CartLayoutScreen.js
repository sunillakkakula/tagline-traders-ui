import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Message from "../components/Message";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartAction";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Select,
  IconButton,
  Icon,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import Image from "../components/atoms/Image/Image";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function CartLayoutScreen({ match, location, history }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div>
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

      <Grid container spacing={2} data-aos="fade-up">
        {cartItems.map((item) => (
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Grid container spacing={1} data-aos="fade-up" row>
                <Grid item xs={3}>
                  <Image src={item.image} alt={item.name} />
                  {console.log("Image URL: " + item.image)}
                </Grid>
                <Grid item xs={2}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Grid>
                <Grid item xs={2}>
                  {item.price}
                </Grid>
                <Grid xs={2}>
                  <Select
                    as="select"
                    value={item.qty}
                    defaultValue={1}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Select>
                </Grid>
                <Grid xs={2}>
                  {/* <Button onClick={() => removeFromCartHandler(item.product)}>
                    <i className="fas fa-trash"></i>
                  </Button> */}
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Grid container spacing={1} data-aos="fade-up">
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="primary"
                  align={isMd ? "left" : "center"}
                >
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Icon classes={{ root: classes.iconRoot }}>
                  <img alt="curency inr" src={rupeeSvgIcon} />
                </Icon>
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={cartItems.length === 0}
                  size="small"
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
