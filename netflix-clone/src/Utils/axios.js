import axios from "axios";

const instance = axios.create({
  BASE_URL: "https://api.themoviedb.org/3",
});

export default instance;