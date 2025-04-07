// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
class Dimensions {
  @Prop() width: number;
  @Prop() height: number;
  @Prop() depth: number;
}

@Schema()
class Shipping {
  @Prop() weight: number;
  @Prop({ type: Dimensions }) dimensions: Dimensions;
}

@Schema()
class ProductDescription {
  @Prop() main: string;
  @Prop() descOne: string;
  @Prop() descTwo: string;
  @Prop() descThree: string;
}

@Schema()
class ProductDimensions {
  @Prop() height: string;
  @Prop() weight: string;
  @Prop() depth: string;
}

@Schema()
export class Product {
  @Prop({ required: true }) id: number;
  @Prop({ required: true }) name: string;
  @Prop() slug: string;
  @Prop() brand: string;
  @Prop() productImage: string;
  @Prop() productTitle: string;
  @Prop() productPrice: number;
  @Prop() category: string;
  @Prop() material: string;
  @Prop() isAvailable: boolean;
  @Prop() stock: number;
  @Prop() ratings: number;
  @Prop([String]) tags: string[];
  @Prop([String]) colors: string[];
  @Prop({ type: Shipping }) shipping: Shipping;
  @Prop({ type: ProductDescription }) productDescription: ProductDescription;
  @Prop({ type: ProductDimensions }) productDimensions: ProductDimensions;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
