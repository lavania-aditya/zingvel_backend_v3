import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PartnerType } from 'src/types/common/ISharedTypes';

export type PartnersDocument = Partners & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'lastActiveAt' } })
export class Partners extends Document {
  @Prop({ type: Number })
  countryCode: number;

  @Prop({ type: Number })
  phNumber: number;

  @Prop({ type: Boolean })
  phVerified: boolean;

  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  email?: string;

  @Prop({ type: String })
  buisnessName?: string;

  @Prop({ type: String })
  partner_type: PartnerType;

  @Prop({ type: Date })
  created_at: Date;

  @Prop({ type: Date })
  updated_at: Date;

  @Prop({ type: [Types.ObjectId] })
  packages: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  accommodations: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  activities: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  restaurants: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  events: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  places: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  rentals: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  travelAgencies: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  cabs: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  buses: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  trains: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  localGuides: Types.ObjectId[];

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  website?: string;
}

export const PartnersSchema = SchemaFactory.createForClass(Partners);
