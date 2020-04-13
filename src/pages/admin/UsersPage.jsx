import React from 'react';
import axios from 'axios';
import {
  Button,
  Col,
  Row,
  Table,
} from 'react-bootstrap';

import { API_BASE_URL, X_AUTH_TOKEN_ADMIN } from '../../types/index';

const UsersPage = () => {
  const [users, setUsers] = React.useState([]);
  const [guests, setGuests] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

    axios
      .get(`${API_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setUsers(data.userAccounts);
        setGuests(data.guestAccounts);
      })
      .catch(() => {
        // Handle Error
      });
  }, []);

  const handleDelete = (id, type) => {
    const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

    axios
      .delete(`${API_BASE_URL}/admin/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (type === 'user') {
          setUsers(users.filter((user) => user._id !== id));
        } else {
          setGuests(guests.filter((guest) => guest._id !== id));
        }
      })
      .catch(() => {
        // Handle Error
      });
  };

  return (
    <div>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <h2 className="mb-4">Users Accounts</h2>
          <Table hover striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      <img
                        alt={user.name}
                        src={user.imageUrl}
                        width="25px"
                        height="25px"
                        className="object-fit-center"
                      />
                    </td>
                    <td className="text-center">
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => handleDelete(user._id, 'user')}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <h2 className="mb-4">Guests Accounts</h2>
          <Table hover striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                guests.map((guest) => (
                  <tr key={guest._id}>
                    <td>{guest.name}</td>
                    <td>
                      <img
                        alt={guest.name}
                        src={guest.imageUrl}
                        width="25px"
                        height="25px"
                        className="object-fit-center"
                      />
                    </td>
                    <td className="text-center">
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => handleDelete(guest._id, 'guest')}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default UsersPage;
