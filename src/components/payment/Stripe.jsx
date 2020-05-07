import React from 'react';
import PropTypes from 'prop-types';
import StripeButton from 'react-stripe-checkout';

const client = "pk_test_b5TM5xwfx9cXw1eyNqWoBhTz00n4IFkQiJ";

const Stripe = ({ amount, onSuccess }) => (
  <StripeButton
    amount={amount * 100}
    billingAddress={false}
    currency="USD"
    label="Pay with Stripe"
    shippingAddress={false}
    stripeKey={client}
    token={onSuccess}
  />
);

Stripe.defaultProps = {
  amount: 0,
};

Stripe.propTypes = {
  amount: PropTypes.number,
};

export default Stripe;
