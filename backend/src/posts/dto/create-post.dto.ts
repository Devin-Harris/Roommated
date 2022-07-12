import { Location, Post } from '@rmtd/common/interfaces';

export class CreatePostDto implements Partial<Post> {
  leaseStart: string;
  leaseEnd: string;
  description: string;
  houseType: 'house' | 'apartment';
  parkingType: 'onstreet' | 'paid' | 'garage';
  petsAllowed: boolean;
  location: Location;
}

