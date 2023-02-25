import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
} from './entities/favorite.entity';
import { Track } from '../tracks/entities/track.entity';

@Module({
  imports: [
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    TypeOrmModule.forFeature([
      Album,
      Artist,
      Track,
      FavoriteTrack,
      FavoriteAlbum,
      FavoriteArtist,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
