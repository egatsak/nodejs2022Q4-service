import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeArtist(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeAlbum(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeTrack(id);
  }
}
