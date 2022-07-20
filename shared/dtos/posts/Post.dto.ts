import { IsNotEmpty, IsOptional, IsEnum, IsDefined, ValidateNested } from 'class-validator';
import { Expose } from 'class-transformer';
import { Housing, HousingType, Parking, ParkingType, PostState, PostStateType } from '../../enums';
import { Location, Post } from '../../interfaces';

class LocationDto implements Location {
  id?: number;

  @IsDefined()
  lng: number;

  @IsDefined()
  lat: number;

  @IsOptional()
  postCode?: string | null;

  @IsOptional()
  city?: string | null;

  @IsOptional()
  district?: string | null;

  @IsOptional()
  state?: string | null;

  @IsOptional()
  country?: string | null;

  @IsNotEmpty()
  placeName: string;
}

export class CreatePostDto implements Partial<Post> {
  @IsNotEmpty()
  leaseStart: string;

  @IsNotEmpty()
  leaseEnd: string;

  @IsOptional()
  description?: string;

  @IsEnum(Housing)
  houseType: HousingType;

  @IsEnum(Parking)
  parkingType: ParkingType;

  @IsDefined()
  petsAllowed: boolean;

  @IsDefined()
  rent: number;

  @IsNotEmpty()
  @ValidateNested()
  location: LocationDto;

  @IsEnum(PostState)
  state: PostStateType;
}

export class UpdatePostDto implements Partial<Post> {
  @IsOptional()
  leaseStart?: string;

  @IsOptional()
  leaseEnd?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(Housing)
  houseType?: HousingType;

  @IsOptional()
  @IsEnum(Parking)
  parkingType?: ParkingType;

  @IsOptional()
  @IsDefined()
  petsAllowed?: boolean;

  @IsOptional()
  rent?: number;

  @IsOptional()
  location?: LocationDto;

  @IsOptional()
  @IsEnum(PostState)
  state?: PostStateType;
}

export class ResponsePostDto implements Post {
  @Expose()
  id!: number;

  @Expose()
  groupId: number;

  @Expose()
  description: string;

  @Expose()
  houseType: HousingType;

  @Expose()
  leaseStart: string;

  @Expose()
  leaseEnd: string;

  @Expose()
  petsAllowed: boolean;

  @Expose()
  parkingType: ParkingType;

  @Expose()
  location: Location;

  @Expose()
  rent: number;

  @Expose()
  state: PostStateType;
}
