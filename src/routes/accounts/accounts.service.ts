import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
  Visitor,
  VisitorDocument,
  Partner,
  PartnerDocument,
  CmsUser,
  CmsUserDocument,
} from './accounts.schemas';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Visitor.name) private visitorModel: Model<VisitorDocument>,
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>,
    @InjectModel(CmsUser.name) private cmsUserModel: Model<CmsUserDocument>,
  ) {}

  async getById(type: string, id: string) {
    const model = this.getModelByType(type);
    const doc = await model.findById(id).lean();
    if (!doc) throw new NotFoundException(`${type} not found`);
    return doc;
  }

  async deleteById(type: string, id: string) {
    const model = this.getModelByType(type);
    const res = await model.findByIdAndDelete(id);
    if (!res) throw new NotFoundException(`${type} not found`);
    return { deleted: true };
  }

  async patchById(type: string, id: string, update: any) {
    const model = this.getModelByType(type);
    const doc = await model.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!doc) throw new NotFoundException(`${type} not found`);
    return doc;
  }

  async getAccountByToken(tokenPayload: { sub: string; type: string }) {
    const { sub, type } = tokenPayload;
    const model = this.getModelByType(type);
    const account = await model.findById(sub).lean();
    if (!account) throw new NotFoundException(`${type} not found`);
    return { data: { type, account } };
  }

  private getModelByType(type: string): Model<any> {
    switch (type) {
      case 'user':
        return this.userModel;
      case 'visitor':
        return this.visitorModel;
      case 'partner':
        return this.partnerModel;
      case 'cmsUser':
        return this.cmsUserModel;
      default:
        throw new NotFoundException('Invalid account type');
    }
  }
}
