import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Packages, PackagesSchema } from './packages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Packages.name, schema: PackagesSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PackagesModule {}
