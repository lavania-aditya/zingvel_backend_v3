import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wanderlists, WanderlistsSchema } from './wanderlists.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wanderlists.name, schema: WanderlistsSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class WanderlistsModule {}
