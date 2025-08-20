import {
  Controller,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard, Roles } from '../../utils/auth.util';
@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly svc: AccountsService) {}

  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Roles('user', 'partner', 'visitor', 'cms-user')
  @Get('by-token')
  @ApiOperation({ summary: 'Get account by token' })
  async getAccountByToken(@Req() req: any) {
    return this.svc.getAccountByToken(req.user);
  }
}
