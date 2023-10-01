import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Public } from 'src/iam/authorization/decorators/public.decorator';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }
  @Public()
  @Get('coordinates/:pointA/:pointB')
  findAll(@Param('pointA') pointA: string, @Param('pointB') pointB: string) {
    return this.routesService.findCordinates(pointA, pointB);
  }

  @Public()
  @Get('create-route/:pointA/:pointB')
  findOne(@Param('pointA') pointA: string, @Param('pointB') pointB: string) {
    return this.routesService.createRoute(pointA, pointB);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}
