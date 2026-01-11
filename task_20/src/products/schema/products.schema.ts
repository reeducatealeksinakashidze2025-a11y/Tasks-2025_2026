import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductCategory } from '../enums/products-category.enum';

@Schema()
export class Products {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
    enum: ProductCategory,
  })
  category: ProductCategory;

  @Prop({
    type: String,
  })
  description?: string;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;
  @Prop({
    type: Boolean,
  })
  isDiscounted: boolean;
}
export const productSchema = SchemaFactory.createForClass(Products);
