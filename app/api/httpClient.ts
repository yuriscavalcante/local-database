import axios from "axios";
import { APP_CONFIG } from "../configs/configs";


export class HttpClient {

    static client = axios.create({
        baseURL: APP_CONFIG.API_BASE_URL,
    });
}

