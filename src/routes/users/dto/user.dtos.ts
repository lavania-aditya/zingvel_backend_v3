import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatarImage?: string;
}

export class SendOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  countryCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phNumber: number;
}

export class VerifyOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  countryCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class GoogleSignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avatarImage: string;
}
