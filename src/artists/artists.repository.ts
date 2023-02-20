import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistRepository extends Repository<ArtistEntity> {
  constructor(private dataSource: DataSource) {
    super(ArtistEntity, dataSource.createEntityManager());
  }

  async getFavoriteArtists(): Promise<ArtistEntity[]> {
    return this.createQueryBuilder('artist_entity')
      .select('artist_entity')
      .innerJoin(
        'favorite_artist',
        'favorites_entity',
        'favorites_entity.artistId = artist_entity.id',
      )
      .getMany();
  }
}
