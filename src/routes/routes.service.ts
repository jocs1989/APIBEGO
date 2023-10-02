import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { HttpService } from '@nestjs/axios';
import { Observable, forkJoin } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ApiGoogle } from './interfaces/api.google.interface';
import apiConfig from './config/api.config';
import { ConfigType } from '@nestjs/config';
import { ApiCoordinate } from './interfaces/apicoodinate.google.interface copy';
import { catchError, map } from 'rxjs/operators';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Route } from './entities/route.entity';

@Injectable()
export class RoutesService {
  private resul_api: any;
  private coordinates_a: ApiCoordinate;
  private coordinates_b: ApiCoordinate;
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly api: ConfigType<typeof apiConfig>,
    @InjectModel(Route.name)
    private readonly routeModel: Model<Route>,
  ) {}

  async createRoute(placeIdA: string, placeIdB: string) {
    try {
      const isExist = await this.findRoute(placeIdA, placeIdB);
      let isValid = false;
      isValid = isExist === null ? true : false;
      isValid = !isExist.isActive ? true : false;
      if (isValid) {
        const url = this.getUrlRoute(placeIdA, placeIdB);
        const result = this.getRouteIndications(url);
        console.log(result[0]);
        const newRoute = new this.routeModel({
          idPointA: placeIdA,
          idPointB: placeIdB,
          indication: result,
        });
        return await newRoute.save();
      }

      throw new NotFoundException('Route Exist in progress');
    } catch (err) {
      throw err;
    }
  }

  async getDistance(placeIdA: string, placeIdB: string) {
    const url = this.getUrlRoute(placeIdA, placeIdB);
    const result = this.getDistanceData(url);
    return result;
  }

  findCoordinates(placeIdA: string, placeIdB: string) {
    const urlA = this.getUrlCoordinates(placeIdA);
    const requestA = this.getCoordinate(urlA);
    const urlB = this.getUrlCoordinates(placeIdB);
    const requestB = this.getCoordinate(urlB);
    return forkJoin([requestA, requestB]).pipe(
      map(([coordinatesA, coordinatesB]) => ({
        placeIdA: coordinatesA.result.geometry,
        placeIdB: coordinatesB.result.geometry,
      })),
    );
  }

  async findRoute(placeIdA: string, placeIdB: string) {
    return await this.routeModel
      .findOne({ idPointA: placeIdA, idPointB: placeIdB })
      .select({ isActive: true })
      .exec();
  }
  async findRoutes() {
    return await this.routeModel
      .find()     
      .exec();
  }


  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }

  private getUrlRoute(placeIdA: string, placeIdB: string) {
    const API_KEY = this.api.key;
    const origin = `place_id:${placeIdA}`;
    const destination = `place_id:${placeIdB}`;
    const mode = 'driving';
    const language = 'es';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&language=${language}&key=${API_KEY}`;
    return url;
  }

  private getUrlCoordinates(placeId: string) {
    const API_KEY = this.api.key;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;
    return url;
  }

  private getCoordinate(url: string) {
    const request = this.httpService.get<ApiCoordinate>(url).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new Error(
          `Error fetching coordinates for placeIdA: ${error.message}`,
        );
      }),
    );

    return request;
  }

  private getRouteIndications(url: string) {
    let data: any;
    const request = this.httpService.get<ApiGoogle>(url).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new Error(
          `Error fetching coordinates for placeIdA: ${error.message}`,
        );
      }),
    );

    return request;
  }
  private getDistanceData(url: string) {
    const request = this.httpService.get<ApiGoogle>(url).pipe(
      map((response) => response.data.routes[0].legs[0].distance),
      catchError((error) => {
        throw new Error(
          `Error fetching coordinates for placeIdA: ${error.message}`,
        );
      }),
    );

    return request;
  }
}
