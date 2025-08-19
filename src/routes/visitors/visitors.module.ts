import { MongooseModule } from '@nestjs/mongoose';
import { Visitors, VisitorsSchema } from './visitors.schema';
import { VisitorsController } from './visitors.controller';
import { VisitorsService } from './visitors.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Visitors.name, schema: VisitorsSchema },
    ]),
  ],
  controllers: [VisitorsController],
  providers: [VisitorsService],
  exports: [],
})
export class VisitorsModule {}
