import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistRepository extends Repository<Artist> {
  constructor(private dataSource: DataSource) {
    super(Artist, dataSource.createEntityManager());
  }

  async getFavoriteArtists(): Promise<Artist[]> {
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
