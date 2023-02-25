import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumRepository } from './albums.repository';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { Album } from './entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorites } from '../favorites/entities/favorite.entity';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([Album, Artist, Favorites, Track]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumRepository],
  exports: [AlbumsService, AlbumRepository],
})
export class AlbumsModule {}
