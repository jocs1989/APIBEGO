import { IsHexadecimal, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class Location {
  @ApiProperty({
    description: 'Name of the place',
    example: 'Puerto Madero, CABA',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'placeId',
    example: 'ChIJiQPXwtk0o5URj2cW455eew4',
  })
  @IsNotEmpty()
  placeId: string;
}

class Point {
  @ApiProperty({
    description: '_id',
    example: '6480d4d0665cefa2836dff02',
  })
  @IsString()
  _id: string;

  @ApiProperty({
    description: 'Location information',
    type: Location,
  })
  @IsNotEmpty()
  location: Location;
}

export class CreatePointDto extends Point {}
