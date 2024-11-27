import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        role: "owner",
    });

    const { name, email, password, password2, role } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }

        if (isSuccess || user) {
            navigate("/dashboard");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert("Las contraseñas no coinciden");
        } else {
            const userData = {
                name,
                email,
                password,
                role,
            };

            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center my-4">Registro</h2>
                    {isError && <Alert variant="danger">{message}</Alert>}
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Nombre"
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Contraseña"
                                onChange={onChange}
                                required
                                minLength="6"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                name="password2"
                                value={password2}
                                placeholder="Confirmar Contraseña"
                                onChange={onChange}
                                required
                                minLength="6"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select
                                name="role"
                                value={role}
                                onChange={onChange}
                            >
                                <option value="owner">Dueño</option>
                                <option value="walker">Paseador</option>
                            </Form.Select>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                        >
                            Registrarse
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
