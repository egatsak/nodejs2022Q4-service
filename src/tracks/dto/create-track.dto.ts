import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((prop) => prop.artistId !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string | null; // refers to Artist

  @ValidateIf((prop) => prop.albumId !== null)
  @IsNotEmpty()
  @IsString()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}
