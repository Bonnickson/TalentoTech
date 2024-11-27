import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPet } from "../features/pets/petSlice";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

function PetForm() {
    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        age: "",
        weight: "",
        specialNeeds: "",
    });

    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!formData.name.trim()) {
            setError("El nombre de la mascota es obligatorio");
            return;
        }

        dispatch(createPet(formData));
        navigate("/dashboard");
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Registrar Nueva Mascota</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Nombre de la Mascota"
                        onChange={onChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        name="breed"
                        value={formData.breed}
                        placeholder="Raza"
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="number"
                        name="age"
                        value={formData.age}
                        placeholder="Edad"
                        onChange={onChange}
                        min="0"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="number"
                        name="weight"
                        value={formData.weight}
                        placeholder="Peso (kg)"
                        onChange={onChange}
                        step="0.1"
                        min="0"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        name="specialNeeds"
                        value={formData.specialNeeds}
                        placeholder="Necesidades Especiales"
                        onChange={onChange}
                        rows={3}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Registrar Mascota
                </Button>
            </Form>
        </Container>
    );
}

export default PetForm;
