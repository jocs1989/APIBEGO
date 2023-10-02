import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from './entities/truck.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TrucksService {
  constructor(
    @InjectModel(Truck.name)
    private readonly truckModel: Model<Truck>,
  ) {}
  async create(createTruckDto: any) {
    try {
      const user = new this.truckModel({ ...createTruckDto });
      return await user.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    return await this.truckModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.truckModel
      .findOne({
        _id: {
          oid: id,
        },
      })
      .exec();
    if (!user) {
      throw new NotFoundException('Truck not Exist');
    }
    return user;
  }

  update(id: number, updateTruckDto: UpdateTruckDto) {
    return `This action updates a #${id} truck`;
  }

  async remove(id: string) {
    return  await this.remove(id).exec();
  }
}
