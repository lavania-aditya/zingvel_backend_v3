import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partners, PartnersDocument } from './partners.schema';
import { SendOtpDto, VerifyOtpDto } from '../users/dto/user.dtos';
import { Message91Service } from 'src/services/message91.service';
import { generateToken } from '../../utils/auth.util';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partners.name) private partnersModel: Model<PartnersDocument>,
    private readonly message91Service: Message91Service,
  ) {}

  async getPartnerById(id: string) {
    const partner = await this.partnersModel.findById(id).lean();
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async deletePartnerById(id: string) {
    const res = await this.partnersModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Partner not found');
    return { deleted: true };
  }

  async patchPartnerById(id: string, update: any) {
    const partner = await this.partnersModel
      .findByIdAndUpdate(id, update, { new: true })
      .lean();
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async checkUsernameAvailable(username: string) {
    const partner = await this.partnersModel.findOne({ username }).lean();
    return { available: !partner };
  }

  async sendOtp(dto: SendOtpDto) {
    if (!dto.countryCode || !dto.phNumber) {
      throw new BadRequestException();
    }
    const apiRes = await this.message91Service.sendOtp(
      dto.countryCode.toString(),
      dto.phNumber.toString(),
    );
    if (apiRes) {
      return true;
    }
    throw new InternalServerErrorException();
  }

  async verifyOtp(dto: VerifyOtpDto) {
    if (!dto.countryCode || !dto.phNumber || !dto.otp) {
      throw new BadRequestException();
    }
    const apiRes = await this.message91Service.verifyOtp(
      dto.countryCode.toString(),
      dto.phNumber.toString(),
      dto.otp,
    );
    if (apiRes) {
      let dbPartner = await this.partnersModel.findOne({
        phNumber: Number(dto.phNumber),
      });
      if (!dbPartner) {
        dbPartner = await this.partnersModel.create({
          countryCode: Number(dto.countryCode),
          phNumber: Number(dto.phNumber),
          phVerified: true,
        });
      } else {
        dbPartner = await this.partnersModel.findOne({
          phNumber: Number(dto.phNumber),
        });
      }
      const authResponse = await generateToken('partner', dbPartner);
      return authResponse;
    }
    throw new InternalServerErrorException();
  }
}
