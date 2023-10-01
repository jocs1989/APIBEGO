import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Point, PointSchema } from './entities/point.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Point.name,
        schema: PointSchema,
      },
    ]),
  ],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
