import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Rating from "../components/Rating";
import Message from "../components/Message";
import Spinner from "../components/controls/Spinner";
import SectionHeader from "../components/controls/SectionHeader";
import Select from "@material-ui/core/Select";
import { listProductDetails } from "../actions/productAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Image from "../components/atoms/Image/Image";
// import Image from "./atoms/Image/Image";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  useMediaQuery,
  Grid,
  Button,
  Icon,
  MenuItem,
  Paper,
} from "@material-ui/core";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
import { Link } from "react-router-dom";
import logo from "../assets/images/products/Cashews.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  imageFrame: {
    boxShadow: `0 5px 12px 0 ${theme.palette.cardShadow}`,
    borderRadius: theme.spacing(1),
  },
  listGrid: {
    overflow: "hidden",
  },
  partnerImage: {
    maxWidth: 120,
  },
  imageIcon: {
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
  },
  image: {
    objectFit: "contain",
    height: 120,
  },
}));

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    }
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Link
                className="btn"
                to="/home"
                style={{
                  color: "white",
                  backgroundColor: "#26A541",
                  marginRight: "5rem",
                }}
              >
                Go to Supermarket
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <SectionHeader
                      title={product.name}
                      subtitle={product.description}
                      ctaGroup={[
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />,
                      ]}
                      align="center"
                      disableGutter
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} data-aos="fade-up">
                      <Grid item xs={12} align="center">
                        {/* <Typography variant="h6" align="center"> */}
                        Price
                        <Icon classes={{ root: classes.iconRoot }}>
                          <img
                            alt="curency inr"
                            src={rupeeSvgIcon}
                            className={classes.imageIcon}
                          />
                        </Icon>{" "}
                        {product.price}
                        {/* </Typography> */}
                      </Grid>
                      <Grid item xs={12} align="center">
                        {/* <Typography variant="h6" color="primary" align="center"> */}
                        In Stock ?{product.countInStock}
                        {/* </Typography> */}
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={6} align="right">
                            {/* <Typography variant="h6" align="right"> */}
                            Quantity {product.qty}
                            {/* </Typography> */}
                          </Grid>
                          <Grid item xs={6}>
                            <Select
                              value={qty}
                              align="center"
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} align="center">
                        <Button
                          align="center"
                          size="small"
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <img
                  alt="productImage"
                  src={product.image}
                  className={classes.imageIcon}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
