import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackRepository extends Repository<TrackEntity> {
  constructor(private dataSource: DataSource) {
    super(TrackEntity, dataSource.createEntityManager());
  }

  async getFavoriteTracks(): Promise<TrackEntity[]> {
    return this.createQueryBuilder('track')
      .select('track')
      .leftJoinAndSelect('track.album', 'album')
      .leftJoinAndSelect('track.artist', 'artist')
      .innerJoin('favorite_track', 'favorites', 'favorites.trackId = track.id')
      .getMany();
  }
}
