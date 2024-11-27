import axios from "axios";

const API_URL = "http://localhost:5000/api/pets/";

const createPet = async (petData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, petData, config);
    return response.data;
};

const getPets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

const petService = {
    createPet,
    getPets,
};

export default petService;
