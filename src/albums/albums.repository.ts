import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumRepository extends Repository<AlbumEntity> {
  constructor(private dataSource: DataSource) {
    super(AlbumEntity, dataSource.createEntityManager());
  }

  async getFavoriteAlbums(): Promise<AlbumEntity[]> {
    return await this.createQueryBuilder('album_entity')
      .select('album_entity')
      .leftJoinAndSelect('album_entity.artistId', 'artist_entity')
      .innerJoin(
        'favorite_album',
        'favorites_entity',
        'favorites_entity.albumId = album_entity.id',
      )
      .getMany();
  }
}
