import { Controller, Get } from '@nestjs/common';
import { Public } from '../../utils/public.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as os from 'os';
import * as process from 'process';
import * as mongoose from 'mongoose';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Basic Health Check' })
  async checkHealth() {
    let mongoStatus = 'healthy';
    let mongoError = null;
    try {
      // Use native MongoDB driver ping
      await mongoose.connection.db.admin().ping();
    } catch (e: any) {
      mongoStatus = 'unhealthy';
      mongoError = e.message;
    }
    return {
      status: mongoStatus === 'healthy' ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        mongodb: mongoStatus,
      },
      errors: mongoError ? { mongodb: mongoError } : {},
    };
  }

  @Public()
  @Get('detailed')
  @ApiOperation({ summary: 'Detailed Health Information' })
  async detailedHealth() {
    const basic = await this.checkHealth();
    const memory = process.memoryUsage();
    const cpus = os.cpus();
    const disk = { total: null, free: null, percent: null };
    // Disk usage: Node.js doesn't have built-in disk usage, so skip or use a package if needed
    const envVars: Record<string, string> = {};
    for (const [key, value] of Object.entries(process.env)) {
      if (!/(key|secret|token|password|auth)/i.test(key)) {
        envVars[key] = value as string;
      }
    }
    let dbStats = {};
    if (basic.services.mongodb === 'healthy') {
      try {
        dbStats = await mongoose.connection.db.command({ dbStats: 1 });
      } catch {
        dbStats = { error: 'Could not retrieve database statistics' };
      }
    }
    return {
      ...basic,
      system: {
        os: os.type(),
        platform: os.platform(),
        node_version: process.version,
        hostname: os.hostname(),
      },
      resources: {
        cpu: {
          count: cpus.length,
        },
        memory: {
          rss: memory.rss,
          heapTotal: memory.heapTotal,
          heapUsed: memory.heapUsed,
          external: memory.external,
        },
        // disk: disk, // Uncomment if adding disk usage package
      },
      network: {
        ip_address: Object.values(os.networkInterfaces())
          .flat()
          .find((iface) => iface && !iface.internal && iface.family === 'IPv4')?.address || 'unknown',
      },
      environment: envVars,
      database: dbStats,
    };
  }
}
