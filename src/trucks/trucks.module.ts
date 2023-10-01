import { Module } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { Truck, TruckSchema } from './entities/truck.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Truck.name,
        schema: TruckSchema,
      },
    ]),
  ],
  controllers: [TrucksController],
  providers: [TrucksService],
})
export class TrucksModule {}
