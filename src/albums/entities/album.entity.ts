import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import { Artist } from '../../artists/entities/artist.entity';

interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

@Entity()
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artistId: string | null;
}
