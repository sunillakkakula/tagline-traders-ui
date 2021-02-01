import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import { listProducts } from "../actions/productAction";
import Spinner from "../components/controls/Spinner";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  useMediaQuery,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import Image from "../components/atoms/Image/Image";
import logo from "../assets/images/logo.jpg";
// import { Image, IcontText } from "../components/atoms";
// import { IcontText } from "../components/atoms/IconText";

const useStyles = makeStyles((theme) => ({
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

const HomeScreen = ({ match }) => {
  // const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Grid container spacing={isMd ? 4 : 2}>
            {products.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up">
                <Product product={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
