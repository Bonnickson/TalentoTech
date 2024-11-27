import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePet } from "../features/pets/petSlice";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";

function PetList() {
    const dispatch = useDispatch();
    const { pets, isLoading } = useSelector((state) => state.pets);

    const handleDeletePet = (petId) => {
        if (window.confirm("¿Estás seguro de eliminar esta mascota?")) {
            dispatch(deletePet(petId));
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div>
            <h2 className="my-4">Mis Mascotas</h2>
            <Row>
                {pets.map((pet) => (
                    <Col key={pet._id} md={4} className="mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://via.placeholder.com/120"
                            />
                            <Card.Body>
                                <Card.Title>{pet.name}</Card.Title>
                                <Card.Text>
                                    <strong>Raza:</strong> {pet.breed}
                                </Card.Text>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeletePet(pet._id)}
                                    className="w-100"
                                >
                                    Eliminar Mascota
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default PetList;
