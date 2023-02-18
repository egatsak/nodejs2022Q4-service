import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumRepository } from 'src/albums/albums.repository';
import { ArtistRepository } from 'src/artists/artists.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './tracks.repository';

@Injectable()
export class TracksService {
  constructor(
    private albumRepository: AlbumRepository,
    private artistRepository: ArtistRepository,
    private trackRepository: TrackRepository,
  ) {}

  async create(dto: CreateTrackDto) {
    const artist = await this.artistRepository.findOneBy({ id: dto.artistId });

    if (!artist && dto.artistId !== null) {
      throw new NotFoundException(`Artist not found`);
    }

    const album = await this.albumRepository.findOneBy({ id: dto.albumId });

    if (!album && dto.albumId !== null) {
      throw new NotFoundException(`Album not found`);
    }

    const track = await this.trackRepository.save(dto);
    return track;
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track not found`);
    }

    if (dto.artistId !== null) {
      const artist = await this.trackRepository.findOneBy({ id: dto.artistId });
      if (!artist) {
        throw new NotFoundException();
      }
    }

    if (dto.albumId !== null) {
      const album = await this.trackRepository.findOneBy({
        id: dto.albumId,
      });

      if (!album) {
        throw new NotFoundException();
      }
    }

    await this.trackRepository.update(id, dto);
    return Object.assign(track, dto);
  }

  async remove(id: string) {
    /*     const track = await this.db.getTrackByKey({ key: 'id', equals: id });
    if (!track) throw new NotFoundException();
    await this.db.removeTrackFromFavs(id);
    return await this.db.deleteTrack(id); */
  }
}
