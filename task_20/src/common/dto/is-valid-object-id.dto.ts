import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";

export class IsValidObjectId{

    @IsMongoId()
    id:string
}