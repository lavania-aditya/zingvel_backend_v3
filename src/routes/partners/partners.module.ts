import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnersSchema } from './partners.schema';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { Message91Service } from '../../services/message91.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partners', schema: PartnersSchema }]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService, Message91Service],
  exports: [MongooseModule, PartnersService],
})
export class PartnersModule {}
