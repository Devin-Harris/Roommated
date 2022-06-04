import { Gender } from "../enums";

export interface User {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    birthdate?: Date;
    password?: string;
    profileImageUrl?: string;
    bio?: string;
    gender?: Gender;
}
