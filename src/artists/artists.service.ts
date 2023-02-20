import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumRepository } from 'src/albums/albums.repository';
import { TrackRepository } from 'src/tracks/tracks.repository';
import { ArtistRepository } from './artists.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    private artistRepository: ArtistRepository,
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = await this.artistRepository.save(createArtistDto);
    return artist;
  }

  async getAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getById(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.getById(id);
    if (!artist) {
      throw new NotFoundException();
    }
    await this.artistRepository.update(id, updateArtistDto);
    return Object.assign(artist, updateArtistDto);
  }

  async delete(id: string): Promise<void> {
    /*     const artist = await this.getById(id);
    if (!artist) throw new NotFoundException(`Artist not found!`);

    const albums = await this.db.getAllAlbumsByKey({
      key: 'artistId',
      equals: artist.id,
    });

    const tracks = await this.db.getAllTracksByKey({
      key: 'artistId',
      equals: artist.id,
    });

    await Promise.all(
      albums.map(
        async (album) =>
          await this.db.updateAlbum(album.id, { ...album, artistId: null }),
      ),
    );

    await Promise.all(
      tracks.map(
        async (track) =>
          await this.db.updateTrack(track.id, { ...track, artistId: null }),
      ),
    );
    await this.db.removeArtistFromFavs(id);
    await this.db.deleteArtist(id); */
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException();
    }
    await this.artistRepository.delete(id);
  }
}
