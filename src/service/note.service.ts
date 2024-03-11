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
            const res = await apiService().get('/notes', {
                params: queryParams
            });
            return res.data;
        } catch (e) {
            console.error(e);
            alert(e);
        }
    },

    async createNote(title: string, content: string){
        try {
            const res = await apiService().post<Note>('/notes', {
                title,
                content
            });
            alert(`Created note: ${res.data.title}`)
            return res;
        } catch (e) {
            console.error(e);
            alert(e);
        }
    },

    async updateNote(id: number, title: string, content: string){
        try {
            const res = await apiService().put<Note>(`/notes/${id}`, {
                title,
                content
            });
            alert(`Updated note: ${res.data.title}`)
            return res;
        } catch (e) {
            console.error(e);
            alert(e);
        }
    },
    
    async deleteNote(id: number){
        try {
            const res = await apiService().delete<{message: string}>(`/notes/${id}`);
            alert(res.data.message)
            return res;
        } catch (e) {
            console.error(e);
            alert(e);
        }
    }
};
