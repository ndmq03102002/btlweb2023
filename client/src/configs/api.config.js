import axios from "axios";

const APIUrl = "http://localhost:8080/api/v1";

const httpRequest = axios.create({
  baseURL: APIUrl,
});

export default httpRequest;
