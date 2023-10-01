import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Point } from './entities/point.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectModel(Point.name)
    private readonly pointModel: Model<Point>,
  ) {}
  async create(createPointDto: any) {
    try {
      const user = new this.pointModel({ ...createPointDto });

      return await user.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    return await this.pointModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.pointModel
      .findOne({
        _id: {
          oid: id,
        },
      })
      .exec();
    if (!user) {
      throw new NotFoundException('Point not Exist');
    }
    return user;
  }
}
