import { PartialType } from '@nestjs/swagger';
import { ValidateIf, IsNotEmpty, IsString, IsInt } from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @ValidateIf((item) => item.artistId !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string | null;
}
