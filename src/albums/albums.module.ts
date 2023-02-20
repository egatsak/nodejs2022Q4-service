import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumRepository } from './albums.repository';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      FavoritesEntity,
      TrackEntity,
    ]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumRepository],
  exports: [AlbumsService, AlbumRepository],
})
export class AlbumsModule {}
