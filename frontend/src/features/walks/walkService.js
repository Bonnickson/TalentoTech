import axios from "axios";

const API_URL = "http://localhost:5000/api/walks/";

const createWalk = async (walkData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, walkData, config);
    return response.data;
};

const getWalks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

const walkService = {
    createWalk,
    getWalks,
};

export default walkService;
