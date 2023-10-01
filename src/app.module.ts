import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configMongo from './config/db.config';
import { IamModule } from './iam/iam.module';
import { PointsModule } from './points/points.module';
import { TrucksModule } from './trucks/trucks.module';
import { RoutesModule } from './routes/routes.module';

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
    PointsModule,
    TrucksModule,
    RoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
