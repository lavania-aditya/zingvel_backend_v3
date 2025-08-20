import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitorsDocument = Visitors & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'lastActiveAt' } })
export class Visitors extends Document {
  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop({ default: Date.now, expires: 60 * 60 * 24 * 7 }) // 7 days in seconds
  createdAt: Date;
}

export const VisitorsSchema = SchemaFactory.createForClass(Visitors);
