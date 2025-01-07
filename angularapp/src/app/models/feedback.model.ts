import { User } from "./user.model";

export class Feedback{
    feedbackId?:number;
    user?:User;
    feedbackText:string;
    date?:Date;
}