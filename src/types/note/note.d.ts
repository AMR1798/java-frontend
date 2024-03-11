import { User } from "../user/user";
import { Paginate } from "../paginate/paginate";

interface Note {
    id: number;
    title: string;
    content: string;
    user: User;
}

interface ResponseNote extends Paginate<Note> {}  