// create-song.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSongDto {
  @ApiProperty({ description: 'The title of the song' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The artist of the song' })
  @IsString()
  artist: string;

  @ApiProperty({ description: 'The album of the song' })
  @IsString()
  album: string;

  @ApiProperty({ description: 'The genre of the song' })
  @IsString()
  genre: string;
}
