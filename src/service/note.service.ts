import { Note } from "@/types/note/note";
import apiService from "./api.service";

type QueryParam = {
    page?: number;
    size?: number;
};

export const NoteService = {

    async getNotes(params: any) {
        const queryParams: QueryParam = {}
        if (params) {
            Object.keys(params).map((key) => {
                switch (key) {
                    case 'page':
                        queryParams[key] = params[key];
                        break;
                    case 'rows':
                        queryParams.size = params[key];
                        break;
                    default:
                        break;
                }
            });
        }

        try {
            const res = await apiService({ requiresAuth: true }).get('/notes', {
                params: queryParams
            });
            return res.data;
        } catch (e) {
            console.error(e);
        }
    },

    async createNote(title: string, content: string){
        try {
            const res = await apiService({ requiresAuth: true }).post<Note>('/notes', {
                title,
                content
            });
            alert(`Created note: ${res.data.title}`)
            return res;
        } catch (e) {
            console.error(e);
        }
    },

    async updateNote(id: number, title: string, content: string){
        try {
            const res = await apiService({ requiresAuth: true }).put<Note>(`/notes/${id}`, {
                title,
                content
            });
            alert(`Updated note: ${res.data.title}`)
            return res;
        } catch (e) {
            console.error(e);
        }
    },
    
    async deleteNote(id: number){
        try {
            const res = await apiService({ requiresAuth: true }).delete<{message: string}>(`/notes/${id}`);
            alert(res.data.message)
            return res;
        } catch (e) {
            console.error(e);
        }
    }
};
