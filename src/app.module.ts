import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './database/database.provider';
import { AccountModule } from './routes/accounts/accounts.module';
import { VisitorsModule } from './routes/visitors/visitors.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './utils/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseProvider,
    AccountModule,
    VisitorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
