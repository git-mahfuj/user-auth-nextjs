import { Date } from "mongoose";

export interface Users {
    name : string,
    email : string,
    password : string,
    isVerified?:boolean,
    isAdmin?:boolean,
    forgotPasswordToken:string,
    forgotPasswordExpiry:Date,
    verifyToken:string,
    verifyTokenExpiry:Date
}