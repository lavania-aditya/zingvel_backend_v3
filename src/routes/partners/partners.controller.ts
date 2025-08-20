import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/utils/auth.util';
import { Public } from 'src/utils/public.decorator';
import { SendOtpDto, VerifyOtpDto } from '../users/dto/user.dtos';
import { PartnersService } from './partners.service';

@ApiTags('partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly svc: PartnersService) {}

  @Get(':id')
  @Roles('partner', 'cms-user')
  @ApiOperation({ summary: 'Get partner by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Partner found' })
  @ApiResponse({ status: 404, description: 'Partner not found' })
  getPartnerById(@Param('id') id: string) {
    return this.svc.getPartnerById(id);
  }

  @Delete(':id')
  @Roles('partner', 'cms-user')
  @ApiOperation({ summary: 'Delete partner by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Partner deleted' })
  @ApiResponse({ status: 404, description: 'Partner not found' })
  deletePartnerById(@Param('id') id: string) {
    return this.svc.deletePartnerById(id);
  }

  @Patch(':id')
  @Roles('partner', 'cms-user')
  @ApiOperation({ summary: 'Patch partner by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 200, description: 'Partner updated' })
  @ApiResponse({ status: 404, description: 'Partner not found' })
  patchPartnerById(@Param('id') id: string, @Body() dto: any) {
    return this.svc.patchPartnerById(id, dto);
  }

  @Post('send-otp')
  @Public()
  @ApiOperation({ summary: 'Send OTP to partner phone number' })
  @ApiBody({ type: SendOtpDto })
  @ApiResponse({ status: 200, description: 'OTP sent' })
  sendOtp(@Body() dto: SendOtpDto) {
    return this.svc.sendOtp(dto);
  }

  @Post('verify-otp')
  @Public()
  @ApiOperation({ summary: 'Verify OTP and register/authenticate partner' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({
    status: 200,
    description: 'OTP verified and partner registered/authenticated',
  })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.svc.verifyOtp(dto);
  }

  @Get('check-username-availaible')
  @Roles('partner')
  @ApiOperation({ summary: 'Check if username is available for partner' })
  @ApiQuery({ name: 'username', required: true })
  @ApiResponse({ status: 200, description: 'Username availability checked' })
  checkUsernameAvailable(@Query('username') username: string) {
    return this.svc.checkUsernameAvailable(username);
  }
}
