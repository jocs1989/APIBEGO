import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationController } from './authentication/authentication.controller';
import { AuthorizationService } from './authentication/authentication.service';
import { AuthService } from './authentication/auth/auth.service';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { IamController } from './iam.controller';
import { IamService } from './iam.service';
import { LocalStrategy } from './authentication/strategy/local.strategy';
import { User, UserSchema } from './authentication/entities/user.entity';
import jwtConfig from './config/jwt.config';
import { JwtStrategy } from './authentication/strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/guard/jwt-auth/jwt-auth.guard';
@Module({
  imports: [
    PassportModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: async (configService: ConfigType<typeof jwtConfig>) => ({
        secret: configService.secret,
        signOptions: { expiresIn: configService.ttl },
      }),
      inject: [jwtConfig.KEY],
    }),
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
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class IamModule {}