import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

@Entity()
export class ArtistEntity implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
