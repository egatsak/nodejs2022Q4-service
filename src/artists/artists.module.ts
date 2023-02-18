import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistRepository } from './artists.repository';
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [
    TracksModule,
    AlbumsModule,
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      FavoritesEntity,
      TrackEntity,
    ]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistRepository],
  exports: [ArtistsService, ArtistRepository],
})
export class ArtistsModule {}
