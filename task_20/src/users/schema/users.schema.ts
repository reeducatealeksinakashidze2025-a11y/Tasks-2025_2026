import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Gender } from 'src/common/enums/gender.enum';
import { Expenses } from 'src/expenses/schema/expenses.schema';

@Schema({
    timestamps:true
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;
  @Prop({
    type: String,
    required: true,
  })
  lastName: string;
  @Prop({
    type: String,
    required: true,
    lowercase:true,
    unique:true
  })
  email: string;
  @Prop({
    type: String,
    required: true,
    unique:true
  })
  phoneNumber: string;
  @Prop({
    type: Number,
    enum:Gender,
    required: true,
  })
  gender: Gender;
   @Prop({
    type: Date
  })
  subscriptionStartDate:Date;
   @Prop({
    type: Date
  })
  subscriptionEndDate:Date;
  @Prop({
    type:[mongoose.Types.ObjectId],
    ref:"Expenses",
    default:[]

  })
  expenses:mongoose.Types.ObjectId[]
}

export const UserSchema =SchemaFactory.createForClass(User)
