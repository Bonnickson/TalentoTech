import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";

function WalkDetail() {
    const { id } = useParams();
    const { walks } = useSelector((state) => state.walks);

    const walk = walks.find((w) => w._id === id);

    if (!walk) {
        return (
            <Container className="text-center mt-5">
                <Card>
                    <Card.Body>
                        <Card.Title>Paseo no encontrado</Card.Title>
                        <Link to="/dashboard" className="btn btn-primary mt-3">
                            Volver al Dashboard
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>
                    <h2>Detalles del Paseo</h2>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Mascota:</strong> {walk.pet.name}
                    </Card.Text>
                    <Card.Text>
                        <strong>Paseador:</strong> {walk.walker.name}
                    </Card.Text>
                    <Card.Text>
                        <strong>Fecha:</strong>{" "}
                        {new Date(walk.date).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                        <strong>Estado:</strong> {walk.status}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to="/dashboard" className="btn btn-secondary">
                        Volver
                    </Link>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default WalkDetail;
