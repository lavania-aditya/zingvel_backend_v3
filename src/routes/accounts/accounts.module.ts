import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message91Service } from '../../services/message91.service';
import { UserSchema } from '../users/users.schemas';
import { VisitorsSchema } from '../visitors/visitors.schema';
import { PartnersSchema } from '../partners/partners.schema';
import { CmsUserSchema } from '../cmsUsers/cmsUser.schema';

const test = {
  metadata: {
    additionalProp1: {
      name: 'Aditya Lavania',
      email: 'al.281194@gmail.com',
    },
  },
};
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Visitors', schema: VisitorsSchema },
      { name: 'Partners', schema: PartnersSchema },
      { name: 'CmsUser', schema: CmsUserSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, Message91Service],
  exports: [AccountsService],
})
export class AccountsModule {}
