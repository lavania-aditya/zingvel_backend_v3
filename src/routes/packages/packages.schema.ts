import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Packages extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Number })
  days?: number;

  @Prop({ type: Number })
  regular_price?: number;

  @Prop({ type: Number })
  sale_price?: number;

  @Prop({ type: Number })
  discounted_price?: number;

  @Prop({ type: [String] })
  inclusions?: string[];

  @Prop({ type: [String] })
  exclusions?: string[];

  @Prop({ default: false })
  transfer_included: boolean;

  @Prop({ default: false })
  stay_included: boolean;

  @Prop({ default: false })
  food_included: boolean;

  @Prop({ default: false })
  sightseeing_included: boolean;

  @Prop({ type: Number })
  rating?: number;

  @Prop({ default: false })
  published: boolean;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop({ type: Types.ObjectId, ref: 'Partner', required: true })
  partnerId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'City' }] })
  cities?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  categoryIds?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Itinerary' }] })
  itineraryIds?: Types.ObjectId[];
}

export const PackagesSchema = SchemaFactory.createForClass(Packages);
