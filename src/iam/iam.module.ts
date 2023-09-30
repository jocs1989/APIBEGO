import { Module } from '@nestjs/common';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './authentication/entities/user.entity';
import { AuthorizationController } from './authentication/authentication.controller';
import { AuthorizationService } from './authentication/authentication.service';
import { AuthService } from './authentication/auth/auth.service';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authentication/strategy/local.strategy';
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
