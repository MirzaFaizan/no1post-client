import React from 'react';
import PropTypes from 'prop-types';
import PaypalButton from 'react-paypal-express-checkout';

const client = {
  sandbox: 'AaT1z9kH5yoVt6VC9PcQkGb0R_3V7Xec1Kakpub5lAu1QowACdBUQrjwAAWxnn_ql5W6AySeU9Vbj_9k',
  production: 'ASn2LkrtWNANZk9f_QS_nCMjzR1SrxSEJW88PSZMsc5mK1Z26HQDHmaf3SccxNLonQUQWA1kbQ0l-enT',
};

const env = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'sandbox';

const Paypal = ({ amount, onSuccess }) => (
  <PaypalButton
    client={client}
    currency="USD"
    env={env}
    total={amount}
    onSuccess={onSuccess}
  />
);

Paypal.defaultProps = {
  amount: 0,
  onSuccess: null,
};

Paypal.propTypes = {
  amount: PropTypes.number,
  onSuccess: PropTypes.func,
};

export default Paypal;
