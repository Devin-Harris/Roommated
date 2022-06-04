import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '@rmtd/common/enums';
import { User as IUser } from '@rmtd/common/interfaces';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ nullable: true })
  bio: string;

  @Column()
  gender: Gender;

  /*
    isAdmin property should only be set through manually interacting with the database
    a new user should not be able to be created with this field as true through the users controller
  */
  @Column({ default: false })
  isAdmin: boolean;
}
