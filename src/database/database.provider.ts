import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const DatabaseProvider = MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const uri = config.get<string>('MONGODB_URI');
    const dbName = config.get<string>('MONGODB_DATABASE');
    const env = config.get<string>('ENVIRONMENT');
    return {
      uri,
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  },
});
