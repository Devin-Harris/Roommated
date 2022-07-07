import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '../../enums';
import { IsArray, IsDate, IsInt, IsDecimal } from 'class-validator';
import { PostFilter } from '../../interfaces';

export class PostFilterDto implements PostFilter {
  @IsInt()
  minPrice!: number;

  @IsInt()
  maxPrice!: number;

  @IsInt()
  minGroupSize!: number;

  @IsInt()
  maxGroupSize!: number;

  @IsArray()
  type!: PostTypeFilter[];

  @IsDate()
  moveInDate!: Date;

  @IsArray()
  pets!: PostPetFilter[];

  @IsArray()
  parking!: PostParkingFilter[];

  @IsArray()
  gender!: Gender[];

  @IsDecimal()
  mapCenterLat!: number;

  @IsDecimal()
  mapCenterLng!: number;

  @IsInt()
  mapZoom!: number;
}
