import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationService } from './authentication.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('sign-up')
  signUp(@Body() createAuthorizationDto: any) {
    return this.authorizationService.create(createAuthorizationDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  async login(@Request() req) {
    return req.user;
  }
}
