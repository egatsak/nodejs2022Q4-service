import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistsModule } from 'src/artists/artists.module';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';
import { TrackEntity } from './entities/track.entity';
import { TracksController } from './tracks.controller';
import { TrackRepository } from './tracks.repository';
import { TracksService } from './tracks.service';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      FavoritesEntity,
      TrackEntity,
    ]),
  ],
  controllers: [TracksController],
  providers: [TracksService, TrackRepository],
  exports: [TracksService, TrackRepository],
})
export class TracksModule {}
