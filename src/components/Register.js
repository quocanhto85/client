import React, { useState } from "react";
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
import axios from "axios";
import Login from "./Login";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");
    const [repassword, setRepassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");
    const [visible, setVisible] = useState(false);

    async function registerUser(e) {
        const payload = {
            email,
            username,
            password,
            repassword
        }
        try {
            await axios.post("http://localhost:8000/register", payload).then((response) => {
                console.log(response.data);

                setSuccess(response.data);
                return <Login msg={success} />             
            })
        }
        catch (err) {
            console.log(...err.response.data);
            setErrors([...err.response.data]);
            setVisible(true);
        };
    }

    const onDismiss = () => {
        setVisible(false);
    }

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
                        <h1 style={{ textAlign: "center" }}><i className="fas fa-user-plus"></i> Đăng Ký</h1>
                        <hr />
                        {errors && <div className='mt-3'>
                            <Alert color="danger" isOpen={visible} toggle={onDismiss}>{errors.map((error, i) => (<li key={i}>{error.msg}</li>))}</Alert>
                        </div>}
                        <form name="form" method="post">
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-envelope" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Input>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-user" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="name"
                                    name="name"
                                    placeholder="Enter username"
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
                                    placeholder="Create password"
                                    value={password}
                                    type="password"
                                    name="password"
                                    onChange={(e) => setPassWord(e.target.value)}
                                ></Input>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-lock" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Confirm password"
                                    value={repassword}
                                    type="password"
                                    name="repassword"
                                    onChange={(e) => setRepassword(e.target.value)}
                                ></Input>
                            </InputGroup>

                            <div className="text-center">
                                <ButtonToggle
                                    color="dark"
                                    onClick={registerUser}
                                >
                                    Đăng Ký
                </ButtonToggle>
                                <br />
                                <br />
                                <p className="lead mt-4" style={{ textAlign: "center" }}>
                                    Bạn đã có tài khoản ? <a href="/">Đăng Nhập</a>
                                </p>

                            </div>
                        </form>
                    </CardBody>
                </Card>

            </Container>
        </div>
    )
}

export default Register; 