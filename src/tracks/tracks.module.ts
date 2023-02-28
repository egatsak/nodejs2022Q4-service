import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { Album } from '../albums/entities/album.entity';
import { ArtistsModule } from '../artists/artists.module';
import { Artist } from '../artists/entities/artist.entity';
import { Favorites } from '../favorites/entities/favorite.entity';
import { Track } from './entities/track.entity';
import { TracksController } from './tracks.controller';
import { TrackRepository } from './tracks.repository';
import { TracksService } from './tracks.service';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([Album, Artist, Favorites, Track]),
  ],
  controllers: [TracksController],
  providers: [TracksService, TrackRepository],
  exports: [TracksService, TrackRepository],
})
export class TracksModule {}
