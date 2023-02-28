import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistRepository } from '../artists/artists.repository';
import { AlbumRepository } from './albums.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    private albumRepository: AlbumRepository,
    private artistRepository: ArtistRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const artist = await this.artistRepository.findOneBy({
      id: createAlbumDto.artistId,
    });

    if (!artist && createAlbumDto.artistId !== null) {
      throw new NotFoundException();
    }

    const album = await this.albumRepository.save(createAlbumDto);
    return album;
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const artist = await this.artistRepository.findOneBy({
      id: updateAlbumDto.artistId,
    });
    if (!artist) {
      throw new NotFoundException();
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException();
    }
    await this.albumRepository.update(id, updateAlbumDto);
    return Object.assign(album, updateAlbumDto);
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException();
    }
    await this.albumRepository.delete(id);
  }
}
