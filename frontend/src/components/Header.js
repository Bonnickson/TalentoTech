import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/login");
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="PetWalker Logo"
                    />{" "}
                    PetWalker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user && (
                            <Nav.Link as={Link} to="/dashboard">
                                Dashboard
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Navbar.Text className="me-3">
                                    Bienvenido, {user.name}
                                    <Link to="/profile"> Mi Perfil</Link>
                                </Navbar.Text>
                                <Button
                                    variant="outline-light"
                                    onClick={onLogout}
                                >
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/login"
                                    className="me-2"
                                >
                                    <Button variant="outline-light">
                                        Iniciar Sesión
                                    </Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    <Button variant="light">Registrarse</Button>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
