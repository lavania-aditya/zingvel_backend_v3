import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visitors, VisitorsDocument } from './visitors.schema';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectModel(Visitors.name)
    private readonly visitorModel: Model<VisitorsDocument>,
  ) {}

  async create(metadata?: Record<string, any>): Promise<Visitors> {
    const visitor = new this.visitorModel({ metadata });
    return visitor.save();
  }
}
