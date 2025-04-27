import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop()
  name?: string;

  @Prop()
  slug?: string;

  @Prop()
  productImage?: string;

  @Prop()
  productTitle?: string;

  @Prop()
  productPrice?: number;

  @Prop()
  category?: string;

  @Prop()
  brand?: string;

  @Prop()
  stock?: number;

  @Prop()
  isAvailable?: boolean;

  // createdAt will be automatically managed by Mongoose due to timestamps: true

  @Prop()
  ratings?: number;

  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Prop({ type: [String], default: [] })
  colors?: string[];

  @Prop()
  material?: string;

  @Prop({ type: Object })
  shipping?: {
    weight?: number;
    dimensions?: {
      width?: number;
      height?: number;
      depth?: number;
    };
  };

  @Prop({ type: Object })
  productDescription?: {
    main?: string;
    descOne?: string;
    descTwo?: string;
    descThree?: string;
  };

  @Prop({ type: Object })
  productDimensions?: {
    height?: string;
    weight?: string;
    depth?: string;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);
