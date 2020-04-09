import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Col,
  Form,
  Row,
} from 'react-bootstrap';

import {
  loginAdmin,
} from '../../redux/admin/actions';
import {
  ADMIN_DATA,
  API_BASE_URL,
  X_AUTH_TOKEN_ADMIN,
} from '../../types';

const style = {
  display: 'flex',
  height: '100vh',
};

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChange = (event) => {
    const { name, value } = event.target;

    /* eslint-disable-next-line */
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  const onSubmit = () => {
    axios
      .post(`${API_BASE_URL}/signIn/admin`, {
        email,
        password,
      })
      .then((response) => response.data)
      .then((data) => {
        const payload = {
          name: data.name,
          imageUrl: data.imageUrl,
          userType: data.userType,
        };

        dispatch(loginAdmin(payload));

        history.push('/admin');

        localStorage.setItem(ADMIN_DATA, JSON.stringify(payload));
        localStorage.setItem(X_AUTH_TOKEN_ADMIN, data.token);
      });
  };

  return (
    <div style={style}>
      <Container className="pt-5">
        <Row>
          <Col xs={0} sm={1} md={2} lg={3} xl={4} />
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <h1 className="text-center">Login</h1>
            <Card>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={onSubmit}
                  >
                    Login
                  </Button>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
