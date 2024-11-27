import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Form,
    Button,
    Row,
    Col,
    Alert,
    Card,
} from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";

function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, profile, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    // Esquema de validación con Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("El nombre es obligatorio")
            .min(2, "El nombre debe tener al menos 2 caracteres"),
        email: Yup.string()
            .email("Email inválido")
            .required("El email es obligatorio"),
        phone: Yup.string()
            .matches(/^[0-9]+$/, "El teléfono solo debe contener números")
            .min(9, "Teléfono inválido"),
        address: Yup.string().optional(),
        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .optional(),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Las contraseñas no coinciden"
        ),
    });

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            dispatch(getUserProfile());
        }
    }, [user, navigate, dispatch]);

    // Mostrar mensaje de éxito
    useEffect(() => {
        if (isSuccess) {
            console.log("Redirige");
            const timer = setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

            // Limpiar el timer si el componente se desmonta
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Header>
                            <h2 className="text-center">Editar Perfil</h2>
                        </Card.Header>
                        <Card.Body>
                            {isError && (
                                <Alert variant="danger">{message}</Alert>
                            )}
                            {isSuccess && (
                                <Alert variant="success">
                                    Perfil actualizado exitosamente
                                </Alert>
                            )}

                            <Formik
                                initialValues={{
                                    name: profile?.name || "",
                                    email: profile?.email || "",
                                    phone: profile?.phone || "",
                                    address: profile?.address || "",
                                    password: "",
                                    confirmPassword: "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    // Filtrar solo los campos que han cambiado
                                    const userData = {
                                        ...(values.name !== profile?.name && {
                                            name: values.name,
                                        }),
                                        ...(values.email !== profile?.email && {
                                            email: values.email,
                                        }),
                                        ...(values.phone !== profile?.phone && {
                                            phone: values.phone,
                                        }),
                                        ...(values.address !==
                                            profile?.address && {
                                            address: values.address,
                                        }),
                                        ...(values.password && {
                                            password: values.password,
                                        }),
                                    };

                                    dispatch(updateUserProfile(userData)).then(
                                        (result) => {
                                            if (
                                                result.meta.requestStatus ===
                                                "fulfilled"
                                            ) {
                                                navigate("/dashboard");
                                            }
                                        }
                                    );
                                    setSubmitting(false);
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={
                                                    touched.name && errors.name
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={
                                                    touched.email &&
                                                    errors.email
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Teléfono</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={
                                                    touched.phone &&
                                                    errors.phone
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Dirección</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Nueva Contraseña
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={
                                                    touched.password &&
                                                    errors.password
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Confirmar Contraseña
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={
                                                    touched.confirmPassword &&
                                                    errors.confirmPassword
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-100"
                                        >
                                            Actualizar Perfil
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfilePage;
