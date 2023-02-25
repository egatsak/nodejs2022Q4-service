import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackRepository extends Repository<Track> {
  constructor(private dataSource: DataSource) {
    super(Track, dataSource.createEntityManager());
  }

  async getFavoriteTrack(): Promise<Track[]> {
    return this.createQueryBuilder('track_entity')
      .select('track_entity')
      .leftJoinAndSelect('track_entity.albumId', 'album_entity')
      .leftJoinAndSelect('track_entity.artistId', 'artist_entity')
      .innerJoin(
        'favorite_track',
        'favorites_entity',
        'favorites_entity.trackId = track_entity.id',
      )
      .getMany();
  }
}
