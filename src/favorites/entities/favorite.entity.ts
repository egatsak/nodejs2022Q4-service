import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artists.interface';
import { Track } from 'src/tracks/entities/tracks.interface';

interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class Favorites implements IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class FavoritesResponse implements IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
