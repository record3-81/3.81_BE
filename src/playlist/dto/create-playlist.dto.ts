// create-playlist.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ description: 'The name of the playlist' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The ID of the user who owns the playlist' })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'List of song IDs to be included in the playlist',
    isArray: true,
  })
  @IsArray()
  songIds: number[];
}
