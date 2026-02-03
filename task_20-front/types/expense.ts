import { User } from "./user";

export type Expense = {
    price: number;
    productName: string;
    category:number;
    user: Pick<User, 'firstName' | 'email' | '_id' | 'age'>
    updatedAt: string;
    __v: number;
    _id: string;
}