import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const DatabaseProvider = MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    uri: config.get<string>('MONGODB_URI'),
    dbName: config.get<string>('MONGODB_DATABASE'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
});
