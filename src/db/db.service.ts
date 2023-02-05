import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User } from 'src/users/users.interface';
import { Artist } from 'src/artists/entities/artists.interface';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/tracks.interface';
import { Favorites } from 'src/favorites/entities/favorite.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';

@Injectable()
export class Db {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly tracks: Track[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  /// === USERS ===

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserByKey({ key, equals }): Promise<User | null> {
    const user = this.users.find((user) => user[key] === equals);
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const newUser: User = {
      ...dto,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User | null> {
    /*     const index = this.users.findIndex((user) => user.id === id); */
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    for (const key in dto) {
      user[key] = dto[key];
    }

    user.version++;
    user.updatedAt = Date.now();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }

  /// === ARTISTS ===

  async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtistByKey({ key, equals }): Promise<Artist | null> {
    const artist = this.artists.find((artist) => artist[key] === equals);
    return artist;
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = { ...dto, id: uuid() };
    this.artists.push(newArtist);
    return newArtist;
  }

  async updateArtist(id: string, dto: UpdateArtistDto): Promise<Artist | null> {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      return null;
    }
    for (const key in dto) {
      artist[key] = dto[key];
    }
    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
  }

  // === ALBUMS ===

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async getAlbumByKey({ key, equals }): Promise<Album | null> {
    const album = this.albums.find(
      (item) => item[key as keyof Album] === equals,
    );

    if (!album) {
      return null;
    }

    return album;
  }

  async getAllAlbumsByKey({ key, equals }): Promise<Album[]> {
    const tracks = this.albums.filter((album) => album[key] === equals);
    return tracks;
  }

  async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = { ...dto, id: uuid() };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto): Promise<Album | null> {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      return null;
    }
    for (const key in dto) {
      album[key] = dto[key];
    }
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
  }

  // === TRACKS ===

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async getAllTracksByKey({ key, equals }): Promise<Track[]> {
    const tracks = this.tracks.filter((track) => track[key] === equals);
    return tracks;
  }

  async getTrackByKey({ key, equals }): Promise<Track> {
    const track = this.tracks.find((track) => track[key] === equals);
    return track;
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = { ...dto, id: uuid() };
    this.tracks.push(newTrack);
    return newTrack;
  }

  async updateTrack(id: string, dto: UpdateTrackDto): Promise<Track | null> {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      return null;
    }
    for (const key in dto) {
      track[key] = dto[key];
    }
    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
  }

  // === FAVORITES ===

  async getAllFavorites() {
    return this.favorites;
  }

  async addArtistToFavs(id: string) {
    this.favorites.artists.push(id);
  }

  async removeArtistFromFavs(id: string) {
    const index = this.favorites.artists.findIndex((item) => item === id);
    if (index === -1) {
      return null;
    }
    return this.favorites.artists.splice(index, 1);
  }

  async addAlbumToFavs(id: string) {
    this.favorites.albums.push(id);
  }

  async removeAlbumFromFavs(id: string) {
    const index = this.favorites.albums.findIndex((item) => item === id);
    if (index === -1) {
      return null;
    }
    this.favorites.albums.splice(index, 1);
  }

  async addTrackToFavs(id: string) {
    this.favorites.tracks.push(id);
  }

  async removeTrackFromFavs(id: string) {
    const index = this.favorites.tracks.findIndex((item) => item === id);
    if (index === -1) {
      return null;
    }
    this.favorites.tracks.splice(index, 1);
  }
}
