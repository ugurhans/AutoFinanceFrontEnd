export interface User{
    id:number;
    name:string;
    lastName:string;
    email:string;
    passwordSalt:string;
    passwordHash:string;
}