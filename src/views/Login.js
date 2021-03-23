import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";

import authProvider from "../utils/authProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorPrompt, setErrorPrompt] = useState("");
  const history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    authProvider
      .login(username, password)
      .then((response) => {
        history.push("/progress");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // wrong username/password
          setErrorPrompt("Incorrect username or password. Please try again.");
        } else {
          setErrorPrompt(
            "A problem happened with the server. Please try again."
          );
        }
      });
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorPrompt("");
            }}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorPrompt("");
            }}
          />
        </Form.Group>

        <Button
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
          onClick={handleSubmit}
        >
          Login
        </Button>
        {errorPrompt && <Alert variant="danger">{errorPrompt}</Alert>}
      </Form>
    </div>
  );
}
