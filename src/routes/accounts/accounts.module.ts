import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './accounts.service';
import { AccountController } from './accounts.controller';
import {
  User,
  UserSchema,
  Visitor,
  VisitorSchema,
  Partner,
  PartnerSchema,
  CmsUser,
  CmsUserSchema,
} from './accounts.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Visitor.name, schema: VisitorSchema },
      { name: Partner.name, schema: PartnerSchema },
      { name: CmsUser.name, schema: CmsUserSchema },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountModule {}
