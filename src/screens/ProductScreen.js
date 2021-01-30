import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Rating from "../components/Rating";
import Message from "../components/Message";
import Spinner from "../components/controls/Spinner";
import SectionHeader from "../components/controls/SectionHeader";
import Select from "@material-ui/core/Select";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Image from "../components/atoms/Image/Image";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Icon,
  FormGroup,
  MenuItem,
} from "@material-ui/core";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
// import { Image } from "components/atoms";

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: "contain",
    height: 400,
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
}));

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
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

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Grid
            container
            justify="space-between"
            spacing={isMd ? 4 : 2}
            className={classes.listGrid}
          >
            <Grid item xs={12} md={6} data-aos={"fade-up"}>
              <Grid container spacing={2} alignItems="flex-start">
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
                    align={isMd ? "left" : "center"}
                    disableGutter
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} data-aos="fade-up">
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        color="primary"
                        align={isMd ? "left" : "center"}
                      >
                        Price
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
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        color="primary"
                        align={isMd ? "left" : "center"}
                      >
                        In Stock ?{product.countInStock}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2} data-aos="fade-up">
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="h6"
                            color="primary"
                            align={isMd ? "left" : "center"}
                          >
                            Quantity {product.qty}
                          </Typography>
                          <Select
                            value={qty}
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
                    <Grid item xs={12} md={6}>
                      <Button
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
            </Grid>
            <Grid item xs={12} md={6} data-aos={"fade-up"}>
              <Grid container justify="center">
                <Image
                  src={product.image}
                  alt={product.name}
                  className={classes.image}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* <Row>
          <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>

            <div
              style={{
                display: "flex",
                marginRight: "-15px",
                marginLeft: "15px",
                marginBottom: "30px",
              }}
            >
              <Link
                style={{
                  color: "white",
                  backgroundColor: "#26A541",
                  margingBottom: "5rem",
                }}
                className="btn"
                to="/home"
              >
                <b>
                  <div style={{ fontSize: "0.85rem" }}>Go to Supermarket</div>
                </b>
              </Link>
            </div>
          </Row>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price:{" "}
                  <span style={{ position: "absolute", right: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000000"
                        d="M8,3H18L17,5H13.74C14.22,5.58 14.58,6.26 14.79,7H18L17,9H15C14.75,11.57 12.74,13.63 10.2,13.96V14H9.5L15.5,21H13L7,14V12H9.5V12C11.26,12 12.72,10.7 12.96,9H7L8,7H12.66C12.1,5.82 10.9,5 9.5,5H7L8,3Z"
                      />
                    </svg>

                    {product.price}
                  </span>{" "}
                  {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Col>Price:</Col>
                  <Col>
                    <strong>
                      <span style={{ position: "absolute", right: "5px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#000000"
                            d="M8,3H18L17,5H13.74C14.22,5.58 14.58,6.26 14.79,7H18L17,9H15C14.75,11.57 12.74,13.63 10.2,13.96V14H9.5L15.5,21H13L7,14V12H9.5V12C11.26,12 12.72,10.7 12.96,9H7L8,7H12.66C12.1,5.82 10.9,5 9.5,5H7L8,3Z"
                          />
                        </svg>
                      </span>{" "}
                      {product.price}
                    </strong>
                  </Col>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          */}
        </>
      )}
    </>
  );
};

export default ProductScreen;
