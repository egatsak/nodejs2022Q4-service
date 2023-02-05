import { Injectable, NotFoundException } from '@nestjs/common';
import { Db } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly db: Db) {}

  async create(dto: CreateTrackDto) {
    const artist = await this.db.getArtistByKey({
      key: 'id',
      equals: dto.artistId,
    });

    if (!artist && dto.artistId !== null) {
      throw new NotFoundException(`Artist not found`);
    }

    const album = await this.db.getAlbumByKey({
      key: 'id',
      equals: dto.albumId,
    });

    if (!album && dto.albumId !== null) {
      throw new NotFoundException(`Album not found`);
    }

    const track = await this.db.createTrack(dto);
    return track;
  }

  async findAll() {
    return await this.db.getAllTracks();
  }

  async findOne(id: string) {
    const track = await this.db.getTrackByKey({ key: 'id', equals: id });
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.db.getTrackByKey({
      key: 'id',
      equals: id,
    });

    if (!track) {
      throw new NotFoundException(`Track not found`);
    }

    if (dto.artistId !== null) {
      const artist = await this.db.getArtistByKey({
        key: 'id',
        equals: dto.artistId,
      });
      if (!artist) {
        throw new NotFoundException();
      }
    }

    if (dto.albumId !== null) {
      const album = await this.db.getAlbumByKey({
        key: 'id',
        equals: dto.albumId,
      });

      if (!album) {
        throw new NotFoundException();
      }
    }

    const updatedTrack = await this.db.updateTrack(id, dto);
    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.db.getTrackByKey({ key: 'id', equals: id });
    if (!track) throw new NotFoundException();
    await this.db.removeTrackFromFavs(id);
    return await this.db.deleteTrack(id);
  }
}
