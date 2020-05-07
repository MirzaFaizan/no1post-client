import React from 'react';
import PropTypes from 'prop-types';
// import StripeCheckout from 'react-stripe-checkout';
// import { PayPalButton } from 'react-paypal-button-v2';
// import PaypalExpressButton from 'react-paypal-express-checkout';
import { Col, Modal, Row } from 'react-bootstrap';

// const client = {
//   sandbox: 'AaT1z9kH5yoVt6VC9PcQkGb0R_3V7Xec1Kakpub5lAu1QowACdBUQrjwAAWxnn_ql5W6AySeU9Vbj_9k',
//   production: 'ASn2LkrtWNANZk9f_QS_nCMjzR1SrxSEJW88PSZMsc5mK1Z26HQDHmaf3SccxNLonQUQWA1kbQ0l-enT',
// };

// const env = process.env.NODE_ENV === 'production' ? 'sandbox' : 'sandbox';

const PaymentModal = ({ amount, onClose, open, paypal, stripe }) => {
  return (
    <Modal
      centered
      onHide={onClose}
      show={open}
    >
      <Modal.Header className="text-center">
        <p>
          <strong>
            Create Post for {amount}$
          </strong>
        </p>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} md={6}>
            <div className="align-items-center d-flex h-100 justify-content-center">
              {paypal}
              {/* <PaypalExpressButton
                client={client}
                currency="USD"
                env={env}
                total={amount}
                onError={console.log}
                onCancel={console.log}
                onSuccess={console.log}
              /> */}
              {/* <PaypalExpressButton
                amount={amount}
                shippingPreference="NO_SHIPPING"
                onSuccess={(details, data) => {
                  console.log(details, data);
                }}
                options={{
                  currency: 'USD',
                  clientId: 'AaT1z9kH5yoVt6VC9PcQkGb0R_3V7Xec1Kakpub5lAu1QowACdBUQrjwAAWxnn_ql5W6AySeU9Vbj_9k',
                }}
              /> */}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="align-items-center d-flex h-100 justify-content-center">
              {stripe}
              {/* <StripeCheckout
                name="Create Post"
                amount={amount * 100}
                label="Pay with Stripe"
                billingAddress={false}
                shippingAddress={false}
                stripeKey="pk_test_b5TM5xwfx9cXw1eyNqWoBhTz00n4IFkQiJ"
                token={(token) => console.log(token)}
              /> */}
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

PaymentModal.defaultProps = {
  amount: 0,
  open: true,
  onClose: null,
};

PaymentModal.propTypes = {
  amount: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PaymentModal;
