import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumRepository extends Repository<AlbumEntity> {
  constructor(private dataSource: DataSource) {
    super(AlbumEntity, dataSource.createEntityManager());
  }

  async getFavoriteAlbums(): Promise<AlbumEntity[]> {
    return await this.createQueryBuilder('album')
      .select('album')
      .leftJoinAndSelect('album.artist', 'artist')
      .innerJoin('favorite_album', 'favorites', 'favorites.albumId = album.id')
      .getMany();
  }
}
