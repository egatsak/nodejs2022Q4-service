import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumRepository } from 'src/albums/albums.repository';
import { ArtistRepository } from 'src/artists/artists.repository';
import { TrackRepository } from 'src/tracks/tracks.repository';
import { Repository } from 'typeorm';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoritesResponse,
  FavoriteTrack,
} from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
    private artistRepository: ArtistRepository,
    @InjectRepository(FavoriteTrack)
    private favoriteTrackRepository: Repository<FavoriteTrack>,
    @InjectRepository(FavoriteAlbum)
    private favoriteAlbumRepository: Repository<FavoriteAlbum>,
    @InjectRepository(FavoriteArtist)
    private favoriteArtistRepository: Repository<FavoriteArtist>,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    return {
      artists: await this.artistRepository.getFavoriteArtists(),
      albums: await this.albumRepository.getFavoriteAlbums(),
      tracks: await this.trackRepository.getFavoriteTracks(),
    };
  }

  async findAllAndPopulate() {
    /*    const { artists, albums, tracks } = await this.findAll();

    const artistsPopulated = await Promise.all(
      artists.map((id) => this.db.getArtistByKey({ key: 'id', equals: id })),
    );
    const albumsPopulated = await Promise.all(
      albums.map((id) => this.db.getAlbumByKey({ key: 'id', equals: id })),
    );
    const tracksPopulated = await Promise.all(
      tracks.map((id) => this.db.getTrackByKey({ key: 'id', equals: id })),
    );

    return {
      artists: artistsPopulated,
      albums: albumsPopulated,
      tracks: tracksPopulated,
    } as FavoritesResponse; */
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) throw new UnprocessableEntityException(`Artist not found!`);

    const favArtist = await this.favoriteArtistRepository.exist({
      where: { id },
    });

    if (favArtist) {
      throw new UnprocessableEntityException(
        `This artist was added to favorites earlier!`,
      );
    }

    return await this.favoriteArtistRepository.save(new FavoriteArtist(artist));
  }

  async removeArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) throw new NotFoundException(`Artist not found!`);

    const favArtist = await this.favoriteArtistRepository.findOneBy({
      artist: { id },
    });
    console.log(favArtist);
    console.log(await this.favoriteArtistRepository.find());

    if (!favArtist) {
      throw new UnprocessableEntityException(
        `This artist is not in the favorites list!`,
      );
    }

    await this.favoriteArtistRepository.delete({ artist: { id } });
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) throw new UnprocessableEntityException(`Album not found!`);

    const favAlbum = await this.favoriteAlbumRepository.exist({
      where: { id },
    });

    if (favAlbum) {
      throw new UnprocessableEntityException(
        `This album was added to favorites earlier!`,
      );
    }

    return await this.favoriteAlbumRepository.save(new FavoriteAlbum(album));
  }

  async removeAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) throw new NotFoundException(`Album not found!`);

    const favAlbum = await this.favoriteAlbumRepository.findOneBy({
      album: { id },
    });

    if (!favAlbum) {
      throw new UnprocessableEntityException(
        `This album is not in the favorites list!`,
      );
    }

    await this.favoriteAlbumRepository.delete({ album: { id } });
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) throw new UnprocessableEntityException(`Track not found!`);
    const favTrack = await this.favoriteTrackRepository.exist({
      where: { id },
    });

    if (favTrack) {
      throw new UnprocessableEntityException(
        `This album was added to favorites earlier!`,
      );
    }
    return await this.favoriteTrackRepository.save(new FavoriteTrack(track));
  }

  async removeTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) throw new UnprocessableEntityException(`Track not found!`);

    const favTrack = await this.favoriteTrackRepository.findOneBy({
      track: { id },
    });

    if (!favTrack) {
      throw new UnprocessableEntityException(
        `This track is not in the favorites list!`,
      );
    }

    await this.favoriteTrackRepository.delete({ track: { id } });
  }
}
