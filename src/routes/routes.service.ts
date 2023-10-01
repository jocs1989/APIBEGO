import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class RoutesService {
  private resul_api: any;
  private coordinates_a: ApiCoordinate;
  private coordinates_b: ApiCoordinate;
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly api: ConfigType<typeof apiConfig>,
  ) {}
  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }
  async createRoute(placeIdA: string, placeIdB: string) {
    const url = this.getUbication(placeIdA, placeIdB);
    console.log(url);
    const result = this.httpService.get(url).subscribe((value) => {
      this.resul_api = value.data;
    });
    return this.resul_api;
  }

  findCordinates(placeIdA: string, placeIdB: string) {
    const urlA = this.getCoordinates(placeIdA);
    const requestA = this.httpService.get<ApiCoordinate>(urlA).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new Error(
          `Error fetching coordinates for placeIdA: ${error.message}`,
        );
      }),
    );
    const urlB = this.getCoordinates(placeIdA);
    const requestB = this.httpService.get<ApiCoordinate>(urlB).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new Error(
          `Error fetching coordinates for placeIdB: ${error.message}`,
        );
      }),
    );

    return forkJoin([requestA, requestB]).pipe(
      map(([coordinatesA, coordinatesB]) => ({
        placeIdA: coordinatesA.result.geometry,
        placeIdB: coordinatesB.result.geometry,
      })),
    );
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }

  private getUbication(placeIdA: string, placeIdB: string) {
    const API_KEY = this.api.key;
    const origin = `place_id:${placeIdA}`;
    const destination = `place_id:${placeIdB}`;
    const mode = 'driving';
    const language = 'es';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&language=${language}&key=${API_KEY}`;
    return url;
  }

  private getCoordinates(placeId: string) {
    const API_KEY = this.api.key;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;
    return url;
  }
}
