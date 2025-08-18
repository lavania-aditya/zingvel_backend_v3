import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schemas';
import {
  PatchUserDto,
  SendOtpDto,
  VerifyOtpDto,
  GoogleSignInDto,
} from './dto/user.dtos';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async deleteUserById(id: string) {
    const res = await this.userModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('User not found');
    return { deleted: true };
  }

  async patchUserById(id: string, dto: PatchUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username }).lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async checkUsernameAvailable(username: string) {
    const user = await this.userModel.findOne({ username }).lean();
    return { available: !user };
  }

  async sendOtp(dto: SendOtpDto) {
    // TODO: Implement OTP logic
    return { sent: true };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    // TODO: Implement OTP verification logic
    return { verified: true };
  }

  async signInGoogle(dto: GoogleSignInDto) {
    // TODO: Implement Google sign-in logic
    return { success: true };
  }

  async getUserFromToken(req: any) {
    // Assume req.user is populated by auth middleware
    return req.user;
  }
}
