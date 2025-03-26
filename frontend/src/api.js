import axios from "axios";

const apiKey = process.env.REACT_APP_CHOMP_API_KEY;

export const chompAPI = axios.create({
  baseURL: "https://chompthis.com/api/v2",
  params: {
    api_key: apiKey,
  },
});
