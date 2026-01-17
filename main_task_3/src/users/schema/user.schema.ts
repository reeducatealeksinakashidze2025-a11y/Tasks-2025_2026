import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Gender } from 'src/common/enums/gender.enum';

@Schema({
  timestamps: true,
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
    // lowercase: true,
    // unique: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
    // unique: true,
  })
  phoneNumber: string;
  @Prop({
    type: String,
    enum: Gender,
    required: true,
  })
  gender: Gender;
  @Prop({
    type: Number,
    required: true,
    index:true
  })
  age: number;
  @Prop({
    type: Date,
  })
  subscriptionStartDate: Date;
  @Prop({
    type: Date,
  })
  subscriptionEndDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
