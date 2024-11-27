import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            // Usar Alert de react-bootstrap en lugar de alert
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

        const userData = {
            email,
            password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Container>
            <h2 className="text-center my-4">Iniciar Sesión</h2>
            {isError && <Alert variant="danger">{message}</Alert>}
            <Form onSubmit={onSubmit}>
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
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Iniciar Sesión
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
