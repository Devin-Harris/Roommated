import {
  Housing,
  HousingType,
  Parking,
  ParkingType,
  PostState,
  PostStateType,
} from '@rmtd/common/enums';
import { Post as PostInterface } from '@rmtd/common/interfaces';
import { Group } from 'src/groups/groups.entity';
import { Location } from 'src/posts/locations/location.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post implements PostInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unsigned: true })
  groupId: number;

  @OneToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn()
  group: Group;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date' })
  leaseStart: string;

  @Column({ type: 'date' })
  leaseEnd: string;

  @Column()
  petsAllowed: boolean;

  @Column({ type: 'enum', enum: Parking })
  parkingType: ParkingType;

  @Column({ type: 'enum', enum: Housing })
  houseType: HousingType;

  @Column({ unsigned: true })
  rent: number;

  @Column({ type: 'enum', enum: PostState })
  state: PostStateType;

  @OneToOne(() => Location, (location) => location.id, { eager: true })
  @JoinColumn()
  location: Location;
}
