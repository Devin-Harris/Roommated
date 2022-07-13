import { IsNotEmpty, IsOptional, IsEnum, IsDefined, ValidateNested } from 'class-validator';
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

  @IsNotEmpty()
  @ValidateNested()
  location: LocationDto;

  @IsEnum(PostState)
  state: PostStateType;
}
