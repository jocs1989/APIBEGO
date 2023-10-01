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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthorizationService } from './authentication.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from '../authorization/decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags("Auth")
@Controller('api/auth')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({status: 409,description: 'Conflict Exception'})
  @ApiResponse({status: 201,description: 'Created successfully'})
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authorizationService.create(signUpDto);
  }
  @ApiResponse({status: 409,description: 'Conflict Exception'})
  @ApiResponse({status: 202,description: 'Accepted'})
  @HttpCode(HttpStatus.ACCEPTED)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/')
  saluda() {
    return '<h1>Hola</h1>';
  }
}
