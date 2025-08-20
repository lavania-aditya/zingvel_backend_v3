import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CmsUserSchema } from './cmsUser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CmsUser', schema: CmsUserSchema }]),
  ],
  controllers: [], // Add controllers if needed
  providers: [], // Add services if needed
  exports: [MongooseModule],
})
export class CmsUsersModule {}
