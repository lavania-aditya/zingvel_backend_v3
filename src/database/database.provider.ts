import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const DatabaseProvider = MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const uri = config.get<string>('MONGODB_URI');
    const dbName = config.get<string>('MONGODB_DATABASE');
    const env = config.get<string>('ENVIRONMENT');
    console.log('[DB CONFIG]', { uri, dbName, env });
    return {
      uri,
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  },
});
