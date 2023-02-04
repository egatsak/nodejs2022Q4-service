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

  async deleteUser(id): Promise<void> {
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
}
