import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Cities extends Document {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  heroImage?: string;

  @Prop()
  description?: string;

  @Prop({ type: Number })
  rating?: number;

  @Prop({ required: true })
  googlePlaceId: string;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ unique: true, required: true })
  googleMapsLocation: string;

  @Prop({ type: [String] })
  seasonOfTravel?: string[];
}

export const CitiesSchema = SchemaFactory.createForClass(Cities);
