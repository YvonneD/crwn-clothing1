import React from "react";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_PZ2mJxKp27MumzHcBUkfeSei00fTY51Knp";
  const onToken = (token) => {
    console.log(token);
    alert("payment successful");
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="Yvonne Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://www.svgrepo.com/show/71392/crown.svg"
      description={`Your total payment is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
