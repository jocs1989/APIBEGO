import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { Public } from 'src/iam/authorization/decorators/public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Points')
@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @ApiResponse({ status: 409, description: 'Conflict Exception' })
  @ApiResponse({ status: 202, description: 'Accepted' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Public()
  create(@Body() createPointDto: CreatePointDto) {
    return this.pointsService.create(createPointDto);
  }

  @ApiResponse({ status: 409, description: 'Conflict Exception' })
  @ApiResponse({ status: 200, description: 'OK' })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.pointsService.findAll();
  }

  @ApiResponse({ status: 409, description: 'Conflict Exception' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointsService.findOne(id);
  }
}
