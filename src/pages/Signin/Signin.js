import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Redirect } from 'react-router-dom';
import './signin.css';

import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";

const SIGNIN = gql`
  mutation SignIn($credentials: CredentialsInput) {
  signin(credentials: $credentials) {
    token
    userErrors {
      message
    }
  }
}
`;

export default function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [signin, { data }] = useMutation(SIGNIN);

  const handleClick = () => {
    signin({
      variables: {
        credentials: {
          email,
          password
        }
      }
    });
  };

  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.signin.userErrors.length) {
        setError(data.signin.userErrors[0].message);
      }
      if (data.signin.token) {
        localStorage.setItem("token", data.signin.token);
        setIsLoggedIn(true);
      }
    }
  }, [data]);

  return (
    <>
      {isLoggedIn && <Redirect to="/posts" replace="true" />}
      <div className="form-container">
        <Form className="signin-form">
          {error && <p className="bg-secondary rounded text-white p-1 text-center">{error}</p>}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="mt-3 p-1 rounded" onClick={handleClick}>Signin</Button>
        </Form>
      </div>
    </>
  );
}
