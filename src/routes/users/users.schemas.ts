import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: false }) username?: string;
  @Prop({ unique: true, required: false }) email?: string;
  @Prop() firstName?: string;
  @Prop() lastName?: string;
  @Prop() avatarImage?: string;
  @Prop() countryCode?: number;
  @Prop() phNumber?: number;
  @Prop() role?: string;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
