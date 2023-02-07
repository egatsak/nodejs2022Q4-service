import { ValidateIf, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @ValidateIf((item) => item.artistId !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string | null;
}
