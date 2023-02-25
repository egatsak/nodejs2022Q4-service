import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumRepository extends Repository<Album> {
  constructor(private dataSource: DataSource) {
    super(Album, dataSource.createEntityManager());
  }
  /* 
  async getFavoriteAlbums(): Promise<Album[]> {
    return await this.createQueryBuilder('album_entity')
      .select('album_entity')
      .leftJoinAndSelect('album_entity.artistId', 'artist_entity')
      .innerJoin(
        'favorite_album',
        'favorites_entity',
        'favorites_entity.albumId = album_entity.id',
      )
      .getMany();
  } */
}
