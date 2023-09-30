import { Module } from '@nestjs/common';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './authorization/entities/user.entity';
import { AuthorizationController } from './authorization/authorization.controller';
import { AuthorizationService } from './authorization/authorization.service';
import { AuthService } from './authorization/auth/auth.service';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authorization/strategy/local.strategy';
@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [IamController, AuthorizationController],
  providers: [
    IamService,
    AuthorizationService,
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService, // modified when necessary to create a new encrypted service
    },
    LocalStrategy,
  ],
})
export class IamModule {}
