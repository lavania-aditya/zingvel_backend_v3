import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Wanderlists extends Document {
  @Prop({ default: 'Trip' })
  name: string;

  @Prop({ type: Date })
  travelDate: Date;

  @Prop({ type: Number })
  numberOfDays: number;

  @Prop({
    type: String,
    enum: ['Solo Trip', 'Partner Trip', 'Friends Trip', 'Family Trip'],
    default: 'Solo Trip',
  })
  tripType: 'Solo Trip' | 'Partner Trip' | 'Friends Trip' | 'Family Trip';

  @Prop({ default: '' })
  description: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'City', required: true })
  cityId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  likeCount: number;
}

export const WanderlistsSchema = SchemaFactory.createForClass(Wanderlists);
