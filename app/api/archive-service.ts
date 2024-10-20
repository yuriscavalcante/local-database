import { APP_CONFIG } from "../configs/configs";
import { HttpClient } from "./httpClient";

export class ArchiveService {
    http = HttpClient.client;

    async list(query: any): Promise<any> {
        const { data } = await this.http.get<any>(`${APP_CONFIG.API_BASE_URL}/archives`, { params: query })
        return data
    }

    async save(params: any): Promise<any> {
        const { data } = await this.http.post<any>(`${APP_CONFIG.API_BASE_URL}/archives`, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return data
    }

    streamVideo(id: number) {
        const src = `${APP_CONFIG.API_BASE_URL}/archives/${id}/video`
        console.log(src)
        return src
    }
}