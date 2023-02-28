import { Expose, Transform } from 'class-transformer';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

@Entity()
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artistId: string | null;

  @ManyToOne(() => Album, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'albumId' })
  @Transform(({ value }) => (value ? value.id : null))
  albumId: string | null;

  @Column()
  duration: number;
}
