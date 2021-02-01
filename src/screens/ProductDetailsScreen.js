import React, { useState, useEffect } from "react";
import Rating from "../components/Rating";
import BulkLooseRadioGroup from "../components/controls/BulkLooseRadioGroup";

import { RupeeIcon } from "../components/controls/RupeeIcon";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, ButtonGroup, Grid, Icon, Paper } from "@material-ui/core";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Image from "../components/atoms/Image/Image";

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

const ProductDetailsScreen = (prd) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { product } = prd;
  let [qty, setQty] = useState(1);
  const classes = useStyles();
  let [counter, setCounter] = useState(1);
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

  return (
    <>
      <Paper>
        <BulkLooseRadioGroup parentCB={currentCBHandler} />
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
            <Grid item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
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
          <Grid item xs={6}>
            
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ProductDetailsScreen;
