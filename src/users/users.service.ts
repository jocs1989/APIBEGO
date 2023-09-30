import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UpdateAuthorizationDto } from 'src/iam/authentication/dto/update-authorization.dto';
import { SignUpDto } from 'src/iam/authentication/dto/sign-up.dto';
import { User, UserSchema } from '../iam/authentication/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly authModel: Model<User>,
  ) {}
  async create(signUpDto: SignUpDto) {
    try {
      const user = new this.authModel(signUpDto);
      return await user.save();
    } catch (err) {
      const mgUserValidUnique = 11000;

      if (mgUserValidUnique === err.code) {
        throw new ConflictException('User not valid and password');
      }
      throw err;
    }
  }

  async findAll() {
    return await this.authModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.authModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException('User not Exist');
    }
    return user;
  }

  async update(id: string, updateAuthorizationDto: UpdateAuthorizationDto) {
    const existUser = await this.authModel
      .findByIdAndUpdate(
        { _id: id },
        { $set: updateAuthorizationDto },
        { new: true },
      )
      .exec();
    if (!existUser) {
      throw new NotFoundException('User not Exist');
    }
    return existUser;
  }

  async remove(id: string) {
    return await this.remove(id).exec();
  }
}
