import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configMongo from './config/db.config';
import { IamModule } from './iam/iam.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(configMongo)],
      useFactory: async (configService: ConfigType<typeof configMongo>) => ({
        uri: configService.uri,
      }),
      inject: [configMongo.KEY],
    }),
    IamModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
