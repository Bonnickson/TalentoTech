import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

// Componentes
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

// Páginas
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PetForm from "./pages/PetForm";
import WalkSearch from "./pages/WalkSearch";
import WalkDetail from "./pages/WalkDetail";
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/pet-form"
                            element={
                                <PrivateRoute>
                                    <PetForm />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/walk-search"
                            element={
                                <PrivateRoute>
                                    <WalkSearch />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/walk/:id"
                            element={
                                <PrivateRoute>
                                    <WalkDetail />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
