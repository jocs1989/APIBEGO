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
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from '../authorization/decorators/public.decorator';

@Controller('api/auth')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly authService:AuthService
    ) {}

  @Post('sign-up')
  signUp(@Body() createAuthorizationDto: any) {
    return this.authorizationService.create(createAuthorizationDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/')
  saluda(){
    return "<h1>Hola</h1>"
  }


}
