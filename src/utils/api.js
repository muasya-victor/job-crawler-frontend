import axios from "axios"
import { baseUrl } from "./constants";

export default axios.create({
    baseUrl: baseUrl,
});
