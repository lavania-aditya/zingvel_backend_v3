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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  PatchUserDto,
  SendOtpDto,
  VerifyOtpDto,
  GoogleSignInDto,
} from './dto/user.dtos';

@ApiTags('users')
@Controller('users')
// @UseGuards(RoleGuard) // Placeholder for role-based guard
// @ApiBearerAuth() // Uncomment when JWT is enabled
export class UsersController {
  constructor(private readonly svc: UsersService) {}

  @Get(':id')
  // @Roles('user')
  getUserById(@Param('id') id: string) {
    return this.svc.getUserById(id);
  }

  @Delete(':id')
  // @Roles('user')
  deleteUserById(@Param('id') id: string) {
    return this.svc.deleteUserById(id);
  }

  @Patch(':id')
  // @Roles('user')
  @ApiBody({ type: PatchUserDto })
  patchUserById(@Param('id') id: string, @Body() dto: PatchUserDto) {
    return this.svc.patchUserById(id, dto);
  }

  @Post('send-otp')
  // @Roles('all')
  @ApiBody({ type: SendOtpDto })
  sendOtp(@Body() dto: SendOtpDto) {
    return this.svc.sendOtp(dto);
  }

  @Post('verify-otp')
  // @Roles('all')
  @ApiBody({ type: VerifyOtpDto })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.svc.verifyOtp(dto);
  }

  @Get('username')
  // @Roles('user')
  @ApiQuery({ name: 'username', required: true })
  getUserByUsername(@Query('username') username: string) {
    return this.svc.getUserByUsername(username);
  }

  @Get('check-username-availaible')
  // @Roles('user')
  @ApiQuery({ name: 'username', required: true })
  checkUsernameAvailable(@Query('username') username: string) {
    return this.svc.checkUsernameAvailable(username);
  }

  @Post('sign-in-google')
  // @Roles('all')
  @ApiBody({ type: GoogleSignInDto })
  signInGoogle(@Body() dto: GoogleSignInDto) {
    return this.svc.signInGoogle(dto);
  }

  @Get('user-from-token')
  // @Roles('user')
  getUserFromToken(@Req() req: any) {
    return this.svc.getUserFromToken(req);
  }
}
