import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { knowCategories } from '../enums/expense-category.enum';
import mongoose from 'mongoose';

@Schema()
export class Expenses {
  @Prop({
    type: Number,
    required: true,
    enum: knowCategories,
  })
  category: knowCategories;
  @Prop({
    type:String,
    required:true,
  })
  productName:string;
@Prop({
    type:Number,
    required:true
  })
  quantity:number;
  @Prop({
    type:Number,
    required:true
  })
  price:number;
@Prop({
    type:Number,
    required:true
})
  totalPrice:number;
  @Prop({
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'Users'
})
user:mongoose.Types.ObjectId

}

export const expenseSchema=SchemaFactory.createForClass(Expenses)
