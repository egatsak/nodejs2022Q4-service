import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { Album } from '../albums/entities/album.entity';
import { Favorites } from '../favorites/entities/favorite.entity';
import { Track } from '../tracks/entities/track.entity';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistRepository } from './artists.repository';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [
    TracksModule,
    AlbumsModule,
    TypeOrmModule.forFeature([Album, Artist, Favorites, Track]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistRepository],
  exports: [ArtistsService, ArtistRepository],
})
export class ArtistsModule {}
