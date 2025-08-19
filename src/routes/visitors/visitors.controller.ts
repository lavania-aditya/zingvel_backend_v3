import { Body, Controller, Post } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { generateToken } from '../../utils/auth.util';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Public } from '../../utils/public.decorator';

@ApiTags('visitors')
@Controller('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new visitor and return JWT' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { metadata: { type: 'object', additionalProperties: true } },
    },
  })
  async createVisitor(@Body('metadata') metadata?: Record<string, any>) {
    const visitor = await this.visitorsService.create(metadata);
    const auth = await generateToken('visitor', visitor);
    return auth;
  }
}
