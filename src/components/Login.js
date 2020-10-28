import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Alert,
  Container,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ButtonToggle,
} from "reactstrap";
import { AlertCircle } from 'react-feather';
require('dotenv/config');

const AlertDanger = ({ title }) => (
  <Alert color="danger" isOpen={true}>
    <AlertCircle size={15} />{" "}
    <span>
      {title}
    </span>
  </Alert>
)

AlertDanger.defaultProps = {
  title: ''
}

const Login = ({ history, props }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  console.log(props);
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="app flex-row align-items-center">
      <Container
        style={{
          justifyContent: "center",
          display: "flex",
          marginTop: "100px",
        }}
      >
        <Card style={{}} className="p-5">
          <CardBody>
            <h1 style={{ textAlign: "center" }}>Đăng Nhập</h1>
            <p className="text-muted" style={{ textAlign: "center" }}>
              Đăng Nhập Vào Tài Khoản Của Bạn
            </p>
            <form name="form" onSubmit={(e) => handleLogin(e)}>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                ></Input>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-lock" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassWord(e.target.value)}
                ></Input>
              </InputGroup>

              
              <div className="text-center">
                <ButtonToggle
                  color="dark"
                  onClick={() => {
                    !isLoggedIn && history.push("/sort");
                  }}
                >
                  Đăng Nhập
                </ButtonToggle>

                <p class="lead mt-4">
                  Bạn chưa có tài khoản ? <a href="/register">Đăng ký</a>
                </p>
              </div>
            </form>
          </CardBody>
        </Card>

      </Container>
    </div>
  );
};

export default Login;
