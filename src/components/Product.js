import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, makeStyles, Paper } from "@material-ui/core";
import RupeeIcon, { BiRupee } from "./controls/RupeeIcon";
import MUIControls from "./controls/MUIControls";
import AddProductForm from "./AddProductForm";
import AddIcon from "@material-ui/icons/Add";
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
const Product = ({ product }) => {
  const [openPopup, setOpenPopup] = useState(false);
  // const useStyles = makeStyles((theme) => ({
  //   pageContent: {
  //     margin: theme.spacing(1),
  //     padding: theme.spacing(1),
  //   },

  //   newButton: {
  //     position: "absolute",
  //     right: "10px",
  //   },
  // }));
  const useStyles = makeStyles((theme) => ({
    imageIcon: {
      height: "100%",
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
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <Card
        className="my-1 p-1 rounded"
        style={{
          maxWidth: "18rem",
          maxHeight: "16rem",
          boxShadow: "0 1px 1px rgba(0,0,0,.4)",
        }}
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.image}
            variant="top"
            style={{
              maxWidth: "6em",
              maxHeight: "7em",
              marginLeft: "6rem",
              marginRight: "6rem",
            }}
          />
        </Link>
        <Card.Body>
          <div>
            <strong>{product.name}</strong>
            <span style={{ position: "absolute", right: "5px" }}>
              <RupeeIcon />
              {product.price}
            </span>
          </div>
          <Button variant="contained" disabled>
            1 kg
          </Button>
          <MUIControls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
            }}
          />
        </Card.Body>
      </Card> */}
      <Popup
        title="Order Type"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductDetailsScreen product={product}></ProductDetailsScreen>
      </Popup>
    </>
  );
};

export default Product;
