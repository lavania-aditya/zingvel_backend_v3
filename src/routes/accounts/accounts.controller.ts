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
// import { JwtAuthGuard } from '../users/jwt.guard'; // Uncomment and implement when adding auth

@Controller('account')
// @UseGuards(JwtAuthGuard) // Uncomment when auth is ready
export class AccountController {
  constructor(private readonly svc: AccountsService) {}

  @Get(':type/:id')
  async getById(@Param('type') type: string, @Param('id') id: string) {
    return this.svc.getById(type, id);
  }

  @Delete(':type/:id')
  async deleteById(@Param('type') type: string, @Param('id') id: string) {
    return this.svc.deleteById(type, id);
  }

  @Patch(':type/:id')
  async patchById(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() update: any,
  ) {
    return this.svc.patchById(type, id, update);
  }

  @Get('by-token')
  async getAccountByToken(@Req() req: any) {
    // Assume req.user is populated by auth middleware
    // Example: req.user = { sub: id, type: 'user'|'visitor'|'partner'|'cmsUser' }
    return this.svc.getAccountByToken(req.user);
  }
}
