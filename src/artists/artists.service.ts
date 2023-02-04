import { Injectable, NotFoundException } from '@nestjs/common';
import { Db } from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artists.interface';

@Injectable()
export class ArtistsService {
  constructor(private readonly db: Db) {}
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.db.createArtist(createArtistDto);
    return artist;
  }

  async getAll(): Promise<Artist[]> {
    return await this.db.getAllArtists();
  }

  async getById(id: string): Promise<Artist> {
    const artist = await this.db.getArtistByKey({ key: 'id', equals: id });
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.db.updateArtist(id, updateArtistDto);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async delete(id: string): Promise<Artist> {
    const artist = await this.getById(id);
    await this.db.deleteArtist(id);
    return artist;
  }
}
