import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cities, CitiesSchema } from './cities.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cities.name, schema: CitiesSchema }]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CityModule {}
