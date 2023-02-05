import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { Db } from 'src/db/db.service';
import { FavoritesResponse } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: Db) {}

  async findAll() {
    return await this.db.getAllFavorites();
  }

  async findAllAndPopulate() {
    const { artists, albums, tracks } = await this.findAll();

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
    } as FavoritesResponse;
  }

  async addArtist(id: string) {
    const artist = await this.db.getArtistByKey({
      key: 'id',
      equals: id,
    });

    if (!artist) throw new UnprocessableEntityException(`Artist not found!`);

    const favArtists = (await this.findAll()).artists;

    if (favArtists.includes(id)) {
      throw new UnprocessableEntityException(
        `This artist was added to favorites earlier!`,
      );
    }

    await this.db.addArtistToFavs(id);
  }

  async removeArtist(id: string) {
    const artist = await this.db.getArtistByKey({
      key: 'id',
      equals: id,
    });

    if (!artist) throw new NotFoundException(`Artist not found!`);

    const favArtists = (await this.findAll()).artists;

    if (!favArtists.includes(id)) {
      throw new UnprocessableEntityException(
        `This artist is not in the favorites list!`,
      );
    }

    await this.db.removeArtistFromFavs(id);
  }

  async addAlbum(id: string) {
    const album = await this.db.getAlbumByKey({
      key: 'id',
      equals: id,
    });

    if (!album) throw new UnprocessableEntityException(`Album not found!`);

    const favAlbums = (await this.findAll()).albums;

    if (favAlbums.includes(id))
      throw new UnprocessableEntityException(
        `This album was added to favorites earlier!`,
      );

    await this.db.addAlbumToFavs(id);
  }

  async removeAlbum(id: string) {
    const album = await this.db.getArtistByKey({
      key: 'id',
      equals: id,
    });

    if (!album) throw new NotFoundException(`Album not found!`);

    const favAlbums = (await this.findAll()).albums;

    if (!favAlbums.includes(id)) {
      throw new UnprocessableEntityException(
        `This album is not in the favorites list!`,
      );
    }

    await this.db.removeAlbumFromFavs(id);
  }

  async addTrack(id: string) {
    const track = await this.db.getTrackByKey({
      key: 'id',
      equals: id,
    });

    if (!track) throw new UnprocessableEntityException(`Track not found!`);

    const favTracks = (await this.findAll()).tracks;

    if (favTracks.includes(id))
      throw new UnprocessableEntityException(
        `This track was added to favorites earlier!`,
      );

    await this.db.addTrackToFavs(id);
  }

  async removeTrack(id: string) {
    const track = await this.db.getTrackByKey({
      key: 'id',
      equals: id,
    });

    if (!track) throw new NotFoundException(`Track not found!`);

    const favTracks = (await this.findAll()).tracks;

    if (!favTracks.includes(id)) {
      throw new UnprocessableEntityException(
        `This track is not in the favorites list!`,
      );
    }

    await this.db.removeTrackFromFavs(id);
  }
}
