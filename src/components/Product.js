import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import AddProductForm from "./AddProductForm";
import OrderTypeDialog from "../components/OrderTypeDialog";
import {
  useMediaQuery,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import Image from "../components/atoms/Image/Image";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "./Popup";
// import  from "../screens/ProductScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
import BulkLooseRadioGroup from "./controls/BulkLooseRadioGroup";

const Product = ({ history, match, product }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [qty, setQty] = useState(1);
  const theme = useTheme();
  const [counter, setCounter] = useState(1);

  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const useStyles = makeStyles((theme) => ({
    imageIcon: {
      height: "100%",
    },
    paper: {
      height: "90%",
      width: "100vh",
      padding: ".5rem",
    },
    iconRoot: {
      textAlign: "center",
    },
    newButton: {
      position: "absolute",
      right: "10px",
    },
    image: {
      objectFit: "contain",
      height: 120,
    },
    fontWeightBold: {
      fontWeight: "bold",
    },
    cardMedia: {
      padding: theme.spacing(2, 2, 0, 2),
      display: "flex",
      justifyContent: "center",
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let [orderTypeSelected, setOrderTypeSelected] = useState("loose");
  let [orderType, setOrderType] = useState("loose");
  let [orderTypeResultUI, setOrderTypeResultUI] = useState("");
  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };
  const bulkUI = (
    <Select value={qty} onChange={(e) => setQty(e.target.value)}>
      {[...Array(product.countInStock).keys()].map((x) => (
        <MenuItem key={x + 1} value={x + 1}>
          {x + 1}
        </MenuItem>
      ))}
    </Select>
  );
  const looseUI = (
    <ButtonGroup
      style={{ size: "small" }}
      className="small outlined button group"
      aria-label="small outlined button group"
    >
      {<Button onClick={handleDecrement}>-</Button>}
      {<Button disabled>{counter}</Button>}
      <Button onClick={handleIncrement}>+</Button>
    </ButtonGroup>
  );

  const renderQtyUI = ({ orderType }) => {
    console.log(
      "Exec renderQtyUI ... : orderType :--> " +
        orderType +
        " , orderTypeSelected :==> " +
        orderTypeSelected
    );
    if (orderTypeSelected.startsWith("b")) {
      console.log(" IS BULK ORDER so return UI for that" + orderTypeSelected);

      return;
      <Select value={qty} onChange={(e) => setQty(e.target.value)}>
        {[...Array(product.countInStock).keys()].map((x) => (
          <MenuItem key={x + 1} value={x + 1}>
            {x + 1}
          </MenuItem>
        ))}
      </Select>;
    } else {
      console.log(" IS LOOSE ORDER so return UI for that" + orderTypeSelected);
      return (
        <ButtonGroup
          style={{ size: "small" }}
          className="small outlined button group"
          aria-label="small outlined button group"
        >
          {<Button onClick={handleDecrement}>-</Button>}
          {<Button disabled>{counter}</Button>}
          <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
      );
    }
  };
  useEffect(() => {
    console.log("Exec Use Effect as order Type is Chnaged from Product Screen");
    // setOrderTypeSelected(orderTypeSelected);
    // setOrderTypeResultUI(renderQtyUI(orderTypeSelected));
  }, [orderTypeSelected, orderTypeResultUI]);

  const addToCartHandler = () => {
    history.push(`/cart/${product._id}?qty=${product.qty}`);
  };

  const currentCBHandler = (orderTypeValue) => {
    orderTypeSelected = orderTypeValue;
    setOrderTypeSelected(...orderTypeSelected, orderTypeSelected);
    console.log(
      "orderTypeValue :" +
        orderTypeValue +
        " orderTypeSelected : " +
        orderTypeSelected
    );

    setOrderType(orderTypeValue);
    console.log(
      "is Order Type Bulk ? " +
        orderType +
        ", orderTypeValue: " +
        orderTypeValue
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card>
        <CardMedia className={classes.cardMedia}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              className={classes.image}
            />
          </Link>
        </CardMedia>
        <CardContent>
          <Grid container spacing={2} align="center">
            <Grid item xs={12} md={6}>
              <Typography
                color="textPrimary"
                variant="subtitle1"
                className={classes.fontWeightBold}
                align="left"
              >
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                color="textPrimary"
                variant="subtitle1"
                className={classes.fontWeightBold}
                align="right"
              >
                <Icon classes={{ root: classes.iconRoot }}>
                  <img
                    alt="curency inr"
                    src={rupeeSvgIcon}
                    className={classes.imageIcon}
                  />
                </Icon>{" "}
                {product.price}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} align="center">
            <Grid item xs={12} md={6}>
              <Button
                size="small"
                variant="contained"
                type="submit"
                color="primary"
                disabled
              >
                1kg
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                size="small"
                variant="contained"
                type="submit"
                color="primary"
                onClick={() => {
                  setOpen(true);
                }}
                disabled={product.countInStock === 0}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div>
        <Dialog
          onClose={handleClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Order Type
          </DialogTitle>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={3}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width="3.5rem"
                  height="3.5rem"
                  className={classes.image}
                />
              </Grid>
              <Grid item xs={3}>
                <Grid item>
                  <h5>{product.name}</h5>
                </Grid>
                <Grid item>
                  Price:{" "}
                  <Icon classes={{ root: classes.iconRoot }}>
                    <img alt="curency inr" src={rupeeSvgIcon} />
                  </Icon>
                  {product.price}
                </Grid>
                <Grid item>
                  <h6>{product.description}</h6>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6}>
                    <BulkLooseRadioGroup parentCB={currentCBHandler} />
                  </Grid>
                  <Grid item xs={6}>
                    {/* {} {orderTypeResultUI} */}
                    {console.log(
                      "orderTypeSelected BEFORE RENDERING: " + orderTypeSelected
                    )}
                    {orderTypeSelected.startsWith("l") ? (
                      <h3>{looseUI}</h3>
                    ) : (
                      <h3>{bulkUI}</h3>
                    )}
                  </Grid>
                </Grid>
                {/* <BulkLooseRadioGroup parentCB={currentCBHandler} /> */}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              size="small"
              variant="contained"
              type="submit"
              color="primary"
            >
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Product;
