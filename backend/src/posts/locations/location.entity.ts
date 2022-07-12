import { Location as ILocation } from '@rmtd/common/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location implements ILocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  placeName: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  district: string;

  @Column()
  postCode: string;
}
