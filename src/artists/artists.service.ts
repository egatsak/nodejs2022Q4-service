import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistRepository } from './artists.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private artistRepository: ArtistRepository) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.save(createArtistDto);
    return artist;
  }

  async getAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async getById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.getById(id);
    if (!artist) {
      throw new NotFoundException();
    }
    await this.artistRepository.update(id, updateArtistDto);
    return Object.assign(artist, updateArtistDto);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException();
    }
    await this.artistRepository.delete(id);
  }
}
