import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User, UserSchema } from './entities/user.entity';
import { HashingService } from '../hashing/hashing.service';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectModel(User.name)
    private readonly authModel: Model<User>,
    private readonly hashingService: HashingService,
  ) {}
  async create(signUpDto: SignUpDto) {
    try {
      const hash = await this.hashingService.hash(signUpDto.password);
      const user = new this.authModel({ ...signUpDto, password: hash });
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
  async signIn(email: string) {
    const user = await this.authModel
      .findOne({ email: email })      
      .exec();
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
