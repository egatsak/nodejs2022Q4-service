import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackRepository extends Repository<TrackEntity> {
  constructor(private dataSource: DataSource) {
    super(TrackEntity, dataSource.createEntityManager());
  }

  async getFavoriteTracks(): Promise<TrackEntity[]> {
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
