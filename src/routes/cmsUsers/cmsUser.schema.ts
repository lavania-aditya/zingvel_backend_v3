import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CmsUserDocument = CmsUser & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'lastActiveAt' } })
export class CmsUser extends Document {
  @Prop({ type: Object })
  userName?: string;

  @Prop({ type: Object })
  password?: string;

  @Prop({ type: Object })
  name?: string;
}

export const CmsUserSchema = SchemaFactory.createForClass(CmsUser);
