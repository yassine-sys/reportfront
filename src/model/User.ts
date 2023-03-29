import { group_module } from "./group_module";

export interface User{
    uId:number,
    username:string,
    dateCreation:Date,
    dateModif:Date,
    etat:string,
    idCreateur:number,
    nomUtilisateur:string,
    uDepart:string,
    uLogin:string,
    uMail:string,
    uMatricule:string,
    password:string,
    user_group:group_module
}