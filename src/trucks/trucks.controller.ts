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
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/iam/authorization/decorators/public.decorator';

@ApiTags('Trucks')
@Controller('trucks')
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @ApiResponse({ status: 409, description: 'Conflict Exception' })
  @ApiResponse({ status: 202, description: 'Accepted' })
  @HttpCode(HttpStatus.ACCEPTED)  
  @Post()
  create(@Body() createTruckDto: any) {
    return this.trucksService.create(createTruckDto);
  }

  @ApiResponse({ status: 409, description: 'Conflict Exception' })
  @ApiResponse({ status: 200, description: 'OK' }) 
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.trucksService.findAll();
  }

  @ApiResponse({ status: 409, description: 'Conflict Exception' })
  @ApiResponse({ status: 200, description: 'OK' })  
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trucksService.findOne(id);
  }


}
