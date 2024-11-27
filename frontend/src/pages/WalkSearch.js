import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createWalk } from "../features/walks/walkSlice";
import { getPets } from "../features/pets/petSlice";
import axios from "axios";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const API_URL = "http://localhost:5000/api/users/";

function WalkSearch() {
    const [searchParams, setSearchParams] = useState({
        date: "",
    });

    const [selectedPet, setSelectedPet] = useState("");
    const [walkers, setWalkers] = useState([]);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const { pets } = useSelector((state) => state.pets);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getPets());
    }, [dispatch]);

    const onSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    const searchWalkers = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.get(API_URL + "walkers", {
                params: {
                    date: searchParams.date,
                },
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setWalkers(response.data);
        } catch (error) {
            console.error("Error buscando paseadores", error);
            setError("No se encontraron paseadores disponibles");
        }
    };

    const requestWalk = (walkerId) => {
        if (!selectedPet || !walkerId || !searchParams.date) {
            setError("Por favor, completa todos los campos");
            return;
        }

        const walkData = {
            pet: selectedPet,
            walker: walkerId,
            owner: user._id,
            date: searchParams.date,
        };

        dispatch(createWalk(walkData));
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Buscar Paseador</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={searchWalkers}>
                <Form.Group className="mb-3">
                    <Form.Select
                        value={selectedPet}
                        onChange={(e) => setSelectedPet(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una Mascota</option>
                        {pets.map((pet) => (
                            <option key={pet._id} value={pet._id}>
                                {pet.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="date"
                        name="date"
                        value={searchParams.date}
                        onChange={onSearchChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Buscar Paseadores
                </Button>
            </Form>

            {walkers.length > 0 && (
                <div className="mt-4">
                    <h3>Paseadores Disponibles</h3>
                    {walkers.map((walker) => (
                        <Card key={walker._id} className="mb-3">
                            <Card.Body>
                                <Card.Title>{walker.name}</Card.Title>
                                <Card.Text>
                                    Calificación: {walker.rating}
                                </Card.Text>
                                <Button
                                    variant="success"
                                    onClick={() => requestWalk(walker._id)}
                                >
                                    Solicitar Paseo
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </Container>
    );
}

export default WalkSearch;
