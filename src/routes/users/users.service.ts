import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  BadGatewayException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schemas';
import { VisitorsDocument } from '../visitors/visitors.schema';
import {
  PatchUserDto,
  SendOtpDto,
  VerifyOtpDto,
  GoogleSignInDto,
} from './dto/user.dtos';
import { generateToken } from '../../utils/auth.util';
import { Message91Service } from 'src/services/message91.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel('Visitors')
    private readonly visitorModel: Model<VisitorsDocument>,
    private readonly message91Service: Message91Service,
  ) {}
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
      let dbUser = await this.userModel.findOne({
        phNumber: Number(dto.phNumber),
      });

      if (!dbUser) {
        dbUser = await this.userModel.create({
          countryCode: Number(dto.countryCode),
          phNumber: Number(dto.phNumber),
          phVerified: true,
          firstName: 'Guest',
          lastName: 'User',
        });
      } else {
        dbUser = await this.userModel.findOne({
          phNumber: Number(dto.phNumber),
        });
      }

      const authResponse = await generateToken('user', dbUser);

      return authResponse;
    }
    throw new InternalServerErrorException();
  }

  async verifyOtpAndPromoteVisitor(
    dto: VerifyOtpDto,
    visitorTokenPayload?: any,
  ) {
    const apiRes = await this.message91Service.verifyOtp(
      dto.countryCode.toString(),
      dto.phNumber.toString(),
      dto.otp,
    );
    if (!apiRes) throw new InternalServerErrorException();

    // 1. Check for existing user
    let dbUser = await this.userModel.findOne({
      phNumber: Number(dto.phNumber),
    });
    if (dbUser) {
      // Existing user: Issue user JWT
      return generateToken('user', dbUser);
    }

    // 2. New user: Use visitor metadata
    if (
      visitorTokenPayload &&
      visitorTokenPayload.type === 'visitor' &&
      visitorTokenPayload.data
    ) {
      const visitorId = visitorTokenPayload.data._id;
      const metadata = visitorTokenPayload.data.metadata || {};
      dbUser = await this.userModel.create({
        countryCode: Number(dto.countryCode),
        phNumber: Number(dto.phNumber),
        phVerified: true,
        firstName: metadata.firstName || 'Guest',
        lastName: metadata.lastName || '',
        email: metadata.email,
        avatarImage: metadata.avatarImage,
        ...metadata,
      });
      // Delete the visitor
      await this.visitorModel.deleteOne({ _id: visitorId });
      // Issue user JWT
      return generateToken('user', dbUser);
    }
    // 3. No visitor info found
    throw new UnauthorizedException('No visitor token found');
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
