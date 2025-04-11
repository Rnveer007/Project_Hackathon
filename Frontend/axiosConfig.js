import axios from "axios";

// using axios
const instance = axios.create({
    baseURL: "https://project-hackathon-backend.onrender.com/api",
    withCredentials: true,
});

export default instance;
