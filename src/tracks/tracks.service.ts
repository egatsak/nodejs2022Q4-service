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
    if (!artist) {
      throw new NotFoundException();
    }
    const album = await this.db.createTrack(dto);
    return album;
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
    const artist = await this.db.getArtistByKey({
      key: 'id',
      equals: dto.artistId,
    });
    if (!artist) {
      throw new NotFoundException();
    }
    const album = await this.db.updateTrack(id, dto);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async remove(id: string) {
    const track = await this.db.getTrackByKey({ key: 'id', equals: id });
    if (!track) throw new NotFoundException();
    await this.db.removeTrackFromFavs(id);
    return await this.db.deleteTrack(id);
  }
}
