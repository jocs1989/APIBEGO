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
  Res,
} from '@nestjs/common';
import { AuthorizationService } from './authentication.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from '../authorization/decorators/public.decorator';
<<<<<<< HEAD
import { SignUpDto } from './dto/sign-up.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
@ApiTags('Auth')
=======

>>>>>>> f3c5c20 (end firs module Auth)
@Controller('api/auth')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
<<<<<<< HEAD
    private readonly authService: AuthService,
  ) {}
=======
    private readonly authService:AuthService
    ) {}
>>>>>>> f3c5c20 (end firs module Auth)

  @ApiResponse({ status: 409, description: 'Conflict Exception' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authorizationService.create(signUpDto);
  }
<<<<<<< HEAD
  @ApiResponse({ status: 409, description: 'Conflict Exception' })
  @ApiResponse({ status: 202, description: 'Accepted' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const accessToken = await this.authService.login(req.user);
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    return accessToken;
  }

  @Get('/')
  saluda() {
    return '<h1>Hola</h1>';
  }
}
=======

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
>>>>>>> f3c5c20 (end firs module Auth)
