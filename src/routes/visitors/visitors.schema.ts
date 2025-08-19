import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitorsDocument = Visitors & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'lastActiveAt' } })
export class Visitors extends Document {
  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const VisitorsSchema = SchemaFactory.createForClass(Visitors);
