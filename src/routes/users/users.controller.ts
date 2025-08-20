import {
  Controller,
  Get,
  Delete,
  Patch,
  Post,
  Param,
  Body,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  PatchUserDto,
  SendOtpDto,
  VerifyOtpDto,
  GoogleSignInDto,
} from './dto/user.dtos';
import { Roles } from 'src/utils/auth.util';
import { Public } from 'src/utils/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly svc: UsersService) {}

  @Get(':id')
  @Roles('user', 'cms-user')
  getUserById(@Param('id') id: string) {
    return this.svc.getUserById(id);
  }

  @Delete(':id')
  @Roles('user', 'cms-user')
  deleteUserById(@Param('id') id: string) {
    return this.svc.deleteUserById(id);
  }

  @Patch(':id')
  @Roles('user', 'cms-user')
  @ApiBody({ type: PatchUserDto })
  patchUserById(@Param('id') id: string, @Body() dto: PatchUserDto) {
    return this.svc.patchUserById(id, dto);
  }

  @Post('send-otp')
  @Public()
  @ApiBody({ type: SendOtpDto })
  sendOtp(@Body() dto: SendOtpDto) {
    return this.svc.sendOtp(dto);
  }

  @Post('verify-otp')
  @Public()
  @ApiBody({ type: VerifyOtpDto })
  verifyOtp(@Body() dto: VerifyOtpDto, @Req() req: any) {
    return this.svc.verifyOtpAndPromoteVisitor(dto, req.user);
  }

  @Get('check-username-availaible')
  @Roles('user')
  @ApiQuery({ name: 'username', required: true })
  checkUsernameAvailable(@Query('username') username: string) {
    return this.svc.checkUsernameAvailable(username);
  }

  @Post('sign-in-google')
  @Public()
  @ApiBody({ type: GoogleSignInDto })
  signInGoogle(@Body() dto: GoogleSignInDto) {
    return this.svc.signInGoogle(dto);
  }
}
