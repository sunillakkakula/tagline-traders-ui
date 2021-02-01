import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Paper,
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
  let [isBulkOrder, setIsBulkOrder] = useState(false);
  useEffect(() => {
    console.log("Exec Use Effect as order Type is Chnaged");
    setOrderTypeSelected(orderTypeSelected);
  }, [orderTypeSelected]);
  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  const addToCartHandler = () => {
    // history.push(`/cart/${prd._id}?qty=${prd.qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Clicked Submit Handler");
  };

  const renderQtyUI = ({ isBulkOrder, qty }) => {};

  const currentCBHandler = (orderTypeValue) => {
    // console.log("Order Type Selected :" + orderTypeValue);
    orderTypeSelected = orderTypeValue;
    setOrderTypeSelected(...orderTypeSelected, orderTypeSelected);
    console.log(
      "orderTypeValue :" +
        orderTypeValue +
        " orderTypeSelected : " +
        orderTypeSelected
    );

    setIsBulkOrder(orderTypeValue === "bulk" ? true : false);
    console.log(
      "is Order Type Bulk ? " +
        isBulkOrder +
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
          // fullScreen={fullScreen}
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Order Type
          </DialogTitle>
          <DialogContent dividers>
            {/* <BulkLooseRadioGroup parentCB={currentCBHandler} /> */}
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
                  <Grid item xs={6}></Grid>
                </Grid>
                {/* <BulkLooseRadioGroup parentCB={currentCBHandler} /> */}
              </Grid>
            </Grid>
            {/* <ProductDetailsScreen product={product}></ProductDetailsScreen> */}
            {/* <Paper className={classes.paper}>
            <Paper>
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
                    <h3>{product.name}</h3>
                  </Grid>
                
                  </Grid>
                  <Grid item>
                    Price:{" "}
                    <span style={{ position: "absolute", right: "5px" }}>
                      <Icon classes={{ root: classes.iconRoot }}>
                        <img alt="curency inr" src={rupeeSvgIcon} />
                      </Icon>
                    </span>
                    {product.price}
                  </Grid>
                  <Grid item>Description: {product.description}</Grid>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              </Paper>*/}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Product;
