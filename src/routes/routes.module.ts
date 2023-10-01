import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import apiConfig from './config/api.config';

@Module({
  imports: [HttpModule, ConfigModule.forFeature(apiConfig)],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
