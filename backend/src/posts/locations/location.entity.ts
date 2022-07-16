import { Location as ILocation } from '@rmtd/common/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location implements ILocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  lng: number;

  @Column({ type: 'double' })
  lat: number;

  @Column()
  placeName: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city?: string;

  @Column()
  district: string;

  @Column()
  postCode: string;
}
