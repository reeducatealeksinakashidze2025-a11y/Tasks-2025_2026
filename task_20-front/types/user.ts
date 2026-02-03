import { Expense } from "./expense";

export type User = {
    age: number;
    createdAt: string;
    email: string;
    expenses: Omit<Expense, 'user'>[]
    firstName: string;
    lastName:string;
    phoneNumber:string;
    role:string
    updatedAt: string;
    __v: number;
    _id: string;
}