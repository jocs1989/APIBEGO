import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Public } from 'src/iam/authorization/decorators/public.decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @ApiResponse({ status: 404, description: 'NotFoundException' })
  @ApiResponse({ status: 202, description: 'Accepted' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Public()
  @Get()
  findAll() {
    return this.routesService.findRoutes();
  }
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  @ApiResponse({ status: 200, description: 'OK Route create' })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('create-route/')
  create(@Body() createRouteDto: any) {
    const { pointA, pointB } = createRouteDto;
    return this.routesService.createRoute(pointA, pointB);
  }

  @ApiResponse({ status: 404, description: 'NotFoundException' })
  @ApiResponse({ status: 200, description: 'OK Coordinates' })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Get('coordinates/:pointA/:pointB')
  findCoordinates(
    @Param('pointA') pointA: string,
    @Param('pointB') pointB: string,
  ) {
    return this.routesService.findCoordinates(pointA, pointB);
  }

  @ApiResponse({ status: 404, description: 'NotFoundException' })
  @ApiResponse({ status: 200, description: 'OK Distance' })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Get('distance/:pointA/:pointB')
  getDistance(
    @Param('pointA') pointA: string,
    @Param('pointB') pointB: string,
  ) {
    return this.routesService.getDistance(pointA, pointB);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }


}
