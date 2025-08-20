import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Message91Service } from './services/message91.service';

import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './database/database.provider';
import { PackagesModule } from './routes/packages/packages.module';
import { HealthModule } from './routes/health/health.module';
import { VisitorsModule } from './routes/visitors/visitors.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './utils/jwt-auth.guard';
import { AccountsModule } from './routes/accounts/accounts.module';
import { PartnersModule } from './routes/partners/partners.module';
import { CmsUsersModule } from './routes/cmsUsers/cmsUsers.module';
import { UsersModule } from './routes/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseProvider,
    PackagesModule,
    HealthModule,
    AccountsModule,
    VisitorsModule,
    PartnersModule,
    CmsUsersModule,
    UsersModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    Message91Service,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
