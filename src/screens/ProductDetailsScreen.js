import React, { useState, useEffect } from "react";
import Rating from "../components/Rating";
import BulkLooseRadioGroup from "../components/controls/BulkLooseRadioGroup";

import { RupeeIcon } from "../components/controls/RupeeIcon";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    marginBottom: "1.5em",
  },
}));

const ProductDetailsScreen = (prd) => {
  const { product } = prd;
  let [qty, setQty] = useState(1);
  let [counter, setCounter] = useState(0);
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
      <BulkLooseRadioGroup parentCB={currentCBHandler} />
      {/* <Row>
        <Col md={3}>
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
                <RupeeIcon />
              </span>
              {product.price}
            </ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Col>Price:</Col>
              <Col>
                <strong>
                  <span style={{ position: "absolute", right: "5px" }}>
                    <RupeeIcon />
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
                <Col>{renderQtyUI(isBulkOrder, qty)}</Col>
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
  );
};

export default ProductDetailsScreen;
