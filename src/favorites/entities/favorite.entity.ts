import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';

@Entity()
export class FavoriteArtist {
  constructor(artist: ArtistEntity) {
    this.artist = artist;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ArtistEntity, null, { onDelete: 'CASCADE' })
  artist: ArtistEntity;
}

@Entity()
export class FavoriteAlbum {
  constructor(album: AlbumEntity) {
    this.album = album;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AlbumEntity, null, { onDelete: 'CASCADE' })
  album: AlbumEntity;
}

@Entity()
export class FavoriteTrack {
  constructor(track: TrackEntity) {
    this.track = track;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TrackEntity, null, { onDelete: 'CASCADE' })
  track: TrackEntity;
}

interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavoritesEntity implements IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
interface IFavoritesResponse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}

export class FavoritesResponse implements IFavoritesResponse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
