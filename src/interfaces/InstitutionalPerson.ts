import { Gender } from "@/enum/GenderEnum";

export interface InstitutionarPersonInterface{
    readonly id:number,
    address: string,
    phoneNumber: string,
    email: string,
    gender: Gender
    birthDate: string,
}