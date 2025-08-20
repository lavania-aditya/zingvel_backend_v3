import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './users.schemas';
import { Visitors, VisitorsSchema } from '../visitors/visitors.schema';
import { Message91Service } from '../../services/message91.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: 'Visitors', schema: VisitorsSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, Message91Service],
  exports: [UsersService],
})
export class UsersModule {}
