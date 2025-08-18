import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true }) email: string;
  @Prop() name?: string;
  @Prop() password?: string;
  @Prop() role?: string;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

@Schema({ timestamps: true })
export class Visitor {
  @Prop({ required: true }) email: string;
  @Prop() name?: string;
}
export type VisitorDocument = HydratedDocument<Visitor>;
export const VisitorSchema = SchemaFactory.createForClass(Visitor);

@Schema({ timestamps: true })
export class Partner {
  @Prop({ required: true }) email: string;
  @Prop() companyName?: string;
  @Prop() contactName?: string;
}
export type PartnerDocument = HydratedDocument<Partner>;
export const PartnerSchema = SchemaFactory.createForClass(Partner);

@Schema({ timestamps: true })
export class CmsUser {
  @Prop({ required: true }) email: string;
  @Prop() name?: string;
}
export type CmsUserDocument = HydratedDocument<CmsUser>;
export const CmsUserSchema = SchemaFactory.createForClass(CmsUser);
