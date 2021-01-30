import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartAction";
import { Link } from "react-router-dom";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("GPay");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      {/* <Row>
        <Link
          style={{
            color: "white",
            backgroundColor: "#26A541",
            marginLeft: "1rem",
            marginBottom: "1rem",
          }}
          className="btn"
          to="/home"
        >
          <b>
            <div style={{ fontSize: "0.85rem" }}>Go to Supermarket</div>
          </b>
        </Link>
      </Row>
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="GPay"
              id="GPay"
              name="paymentMethod"
              value="GPay"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="UPI"
              id="UPI"
              name="paymentMethod"
              value="UPI"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form> */}
    </>
  );
};

export default PaymentScreen;
