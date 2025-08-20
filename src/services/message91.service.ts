import {
  Injectable,
  BadGatewayException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Message91Service {
  private sendOtpTemplateId = process.env.MSG91_TEMPLATE_ID;
  private message91AuthKey = process.env.MSG91_AUTH_KEY;
  private otpExpiryInMin = 5;
  private otpLength = 6;

  private isValidPhNumber(countryCode: number, phNumber: number): boolean {
    // Basic validation: India (91) 10 digits, else 7-15 digits
    const phStr = String(phNumber);
    if (countryCode === 91) return /^\d{10}$/.test(phStr);
    return /^\d{7,15}$/.test(phStr);
  }

  async sendOtp(cntrCode: string, phNum: string): Promise<boolean> {
    try {
      if (!cntrCode || !phNum) {
        throw new BadRequestException();
      }
      const countryCode = Number(cntrCode);
      const phNumber = Number(phNum);
      if (!this.isValidPhNumber(countryCode, phNumber)) {
        throw new BadRequestException('Phone Number not valid');
      }

      if (process.env.ENVIRONMENT === 'development') {
        return true;
      }

      const apiRes: any = await axios.post('https://api.msg91.com/api/v5/otp', {
        template_id: this.sendOtpTemplateId,
        mobile: `${countryCode}${phNumber}`,
        authkey: this.message91AuthKey,
        otp_expiry: this.otpExpiryInMin,
        otp_length: this.otpLength,
      });
      if (apiRes?.data?.type === 'error') {
        throw new BadGatewayException(
          `Message 91 service error: error: ${apiRes?.data?.message}`,
        );
      }
      if (apiRes?.data?.type === 'success' && apiRes?.data?.request_id) {
        return true;
      }
      return false;
    } catch (error) {
      throw new InternalServerErrorException(
        `Message 91 service error: error: ${error}`,
      );
    }
  }

  async verifyOtp(
    cntrCode: string,
    phNum: string,
    otpVal: string,
  ): Promise<boolean> {
    try {
      if (!cntrCode || !phNum || !otpVal) {
        throw new BadRequestException();
      }
      const countryCode = Number(cntrCode);
      const phNumber = Number(phNum);
      const otpValue = Number(otpVal);
      if (!this.isValidPhNumber(countryCode, phNumber)) {
        throw new BadRequestException('Phone Number not valid');
      }

      console.log(process.env.ENVIRONMENT);

      if (process.env.ENVIRONMENT === 'development') {
        return true;
      }

      const apiRes: any = await axios.get(
        'https://api.msg91.com/api/v5/otp/verify',
        {
          params: {
            otp: otpValue,
            mobile: `${countryCode}${phNumber}`,
          },
          headers: {
            authkey: this.message91AuthKey,
          },
        },
      );
      if (apiRes?.data?.type === 'error') {
        throw new BadGatewayException(
          `Message 91 service error: error: ${apiRes?.data?.message}`,
        );
      }
      if (
        apiRes?.data?.type === 'success' &&
        apiRes?.data?.message === 'OTP verified success'
      ) {
        return true;
      }
      return false;
    } catch (error) {
      throw new InternalServerErrorException(
        `Message 91 service error: error: ${error}`,
      );
    }
  }
}
