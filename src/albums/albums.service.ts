import { Injectable, NotFoundException } from '@nestjs/common';
import { Db } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: Db) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const artist = await this.db.getArtistByKey({
      key: 'id',
      equals: createAlbumDto.artistId,
    });

    if (!artist && createAlbumDto.artistId !== null) {
      throw new NotFoundException();
    }

    const album = await this.db.createAlbum(createAlbumDto);
    return album;
  }

  async findAll() {
    return await this.db.getAllAlbums();
  }

  async findOne(id: string) {
    const album = await this.db.getAlbumByKey({ key: 'id', equals: id });
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const artist = await this.db.getArtistByKey({
      key: 'id',
      equals: updateAlbumDto.artistId,
    });
    if (!artist) {
      throw new NotFoundException();
    }
    const album = await this.db.updateAlbum(id, updateAlbumDto);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async remove(id: string) {
    const album = await this.findOne(id);

    const tracks = await this.db.getAllTracksByKey({
      key: 'albumId',
      equals: album.id,
    });

    await Promise.all(
      tracks.map(
        async (track) =>
          await this.db.updateTrack(track.id, { ...track, albumId: null }),
      ),
    );

    await this.db.removeAlbumFromFavs(id);
    await this.db.deleteAlbum(id);
  }
}
