import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PetList from "./PetList";
import { getPets } from "../features/pets/petSlice";
import { getWalks } from "../features/walks/walkSlice";
import { Link } from "react-router-dom";
import { Container, Row, Card, Button } from "react-bootstrap";

function Dashboard() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { pets } = useSelector((state) => state.pets);
    const { walks } = useSelector((state) => state.walks);

    useEffect(() => {
        dispatch(getPets());
        dispatch(getWalks());
    }, [dispatch]);

    return (
        <Container>
            <h1 className="my-4">Bienvenido, {user.name}</h1>

            {user.role === "owner" && (
                <>
                    <Card className="mb-4">
                        <Card.Header>Mis Mascotas</Card.Header>
                        <Card.Body>
                            <Link
                                to="/pet-form"
                                className="btn btn-primary mb-3"
                            >
                                Agregar Mascota
                            </Link>
                            <Row>
                                <PetList />
                            </Row>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Header>Buscar Paseador</Card.Header>
                        <Card.Body>
                            <Link to="/walk-search" className="btn btn-success">
                                Encontrar Paseador
                            </Link>
                        </Card.Body>
                    </Card>
                </>
            )}

            {user.role === "walker" && (
                <Card className="mb-4">
                    <Card.Header>Paseos Disponibles</Card.Header>
                    <Card.Body>
                        {walks.map((walk) => (
                            <Card key={walk._id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>
                                        Mascota: {walk.pet.name}
                                    </Card.Title>
                                    <Card.Text>
                                        Fecha:{" "}
                                        {new Date(
                                            walk.date
                                        ).toLocaleDateString()}
                                    </Card.Text>
                                    <Button variant="primary">
                                        Aceptar Paseo
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Card.Body>
                </Card>
            )}

            <Card>
                <Card.Header>Mis Paseos</Card.Header>
                <Card.Body>
                    {walks.map((walk) => (
                        <Card key={walk._id} className="mb-3">
                            <Card.Body>
                                <Card.Text>Estado: {walk.status}</Card.Text>
                                <Card.Text>
                                    Fecha:{" "}
                                    {new Date(walk.date).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Dashboard;
